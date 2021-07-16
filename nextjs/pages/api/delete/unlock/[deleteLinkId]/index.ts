import Captcha from '@server/models/captcha';
import createDOMPurify from 'dompurify';
import Crypto from '@server/utils/crypto';
import draftToHtml from 'draftjs-to-html';
import Hash from '@server/utils/hash';
import Note from '@server/models/note';
import { HttpMethods } from '@server/utils/api/types';
import { JSDOM } from 'jsdom';
import { LinkIdFields } from '@server/models/note/types';
import { NoteStatuses } from '@server/models/note/types';
import { RawDraftContentState } from 'draft-js';
import { RequestBody } from '@server/pages/api/access/unlock/types';
import { schema } from '@server/pages/api/access/unlock/schema';
import { validate } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Unlocks a note using delete link ID.
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}  {Promise<void>}
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === HttpMethods.POST) {
    try {
      const nowMilliseconds = new Date().getTime();

      // Validate the incoming data
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(200).send({
          status: NoteStatuses.INVALID,
        });
      }
      const { captchaToken, password } = result.value as RequestBody;

      // Create a captcha object and validate
      const captcha = new Captcha(captchaToken);
      const isCaptchaValid = await captcha.validateToken(0.5);
      if (!isCaptchaValid) {
        // Captcha verification failed
        return res.status(200).send({
          status: NoteStatuses.INVALID,
        });
      }

      const deleteLinkId = req.query.deleteLinkId as string;
      // If not a valid uuid v4
      if (!validate(deleteLinkId)) {
        // Access link is not valid
        return res.status(200).send({
          status: NoteStatuses.INVALID,
        });
      }

      const note = await Note.getWithLinkId(deleteLinkId, LinkIdFields.DELETE);
      // If no document returned from the database
      if (!note) {
        // Access link is not valid
        return res.send({
          status: NoteStatuses.INVALID,
        });
      }

      // If the expiry time has expired
      if (nowMilliseconds >= note.expiryDate.getTime()) {
        // Trigger a document delete
        note.delete();
        // Access link is not valid
        return res.status(200).send({
          status: NoteStatuses.INVALID,
        });
      }

      // Do a bcrypt verification on password
      const passwordMatch = await Hash.compare(
        password,
        note.password as string,
      );

      if (!passwordMatch) {
        // Password is incorrect
        return res.status(400).end();
      }

      // Get decryption key from password
      const key = Crypto.getKeyFromPassword(
        Buffer.from(password),
        note.salt as Buffer,
      );
      const window = new JSDOM('').window;
      // @ts-expect-error
      const DOMPurify = createDOMPurify(window);
      const content = Note.decrypt(note.content, key);
      const rawContent = JSON.parse(content) as RawDraftContentState;

      // Download encrypted images and put base64 strings back into entityMap
      const entityMap = await Note.downloadImages(note.noteId, rawContent);
      const transformedContent = {
        ...rawContent,
        entityMap: entityMap,
      };

      const htmlContent = draftToHtml(transformedContent);
      const sanitizedContent = DOMPurify.sanitize(htmlContent);
      const title = Note.decrypt(note.title, key);

      // Free access
      // Trigger a view increment
      note.increaseViewCount();
      res.status(200).send({
        status: NoteStatuses.UNLOCKED,
        content: sanitizedContent,
        title: title,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Something went wrong!',
      });
    }
  } else {
    res.status(405).send({
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
