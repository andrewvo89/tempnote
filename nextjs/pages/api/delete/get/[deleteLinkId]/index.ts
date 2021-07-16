import Captcha from '@server/models/captcha';
import createDOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import Note from '@server/models/note';
import { HttpMethods } from '@server/utils/api/types';
import { JSDOM } from 'jsdom';
import { LinkIdFields, NoteStatuses } from '@server/models/note/types';
import { RawDraftContentState } from 'draft-js';
import { RequestBody } from '@server/pages/api/access/get/types';
import { schema } from '@server/pages/api/access/get/schema';
import { validate } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Gets a note to display on the delete page.
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}  {Promise<void>}
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === HttpMethods.POST) {
    const nowMilliseconds = new Date().getTime();
    // Validate the incoming data
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(200).send({
        status: NoteStatuses.INVALID,
      });
    }
    const { captchaToken } = result.value as RequestBody;

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
      return res.status(200).send({
        status: NoteStatuses.INVALID,
      });
    }

    const note = await Note.getWithLinkId(deleteLinkId, LinkIdFields.DELETE);
    // If no document returned from the database
    if (!note) {
      return res.status(200).send({
        status: NoteStatuses.INVALID,
      });
    }

    // If the expiry time has expired
    if (nowMilliseconds >= note.expiryDate.getTime()) {
      // Trigger a document delete
      note.delete();
      return res.status(200).send({
        status: NoteStatuses.INVALID,
      });
    }

    // If the note is password protected
    if (note.passwordEnabled) {
      return res.status(200).send({
        status: NoteStatuses.LOCKED,
      });
    }

    const key = Buffer.from(process.env.ENCRYPTION_KEY as string, 'utf-8');
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
    return res.status(200).send({
      status: NoteStatuses.UNLOCKED,
      content: sanitizedContent,
      title: title,
    });
  }
};

export default handler;
