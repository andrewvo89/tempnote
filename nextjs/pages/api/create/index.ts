import Captcha from '@server/models/captcha';
import Crypto from '@server/utils/crypto';
import dayjs from 'dayjs';
import Note from '@server/models/note';
import { HttpMethods } from '@server/utils/api/types';
import { RequestBody } from '@server/pages/api/home/types';
import { schema } from '@server/pages/api/home/schema';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Creates a note.
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
      // Validate the incoming data
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json({
          message: 'The data sent to the server is invalid',
        });
      }
      const values = result.value as RequestBody;

      // Create a captcha object and validate
      const captcha = new Captcha(values.captchaToken);
      const isCaptchaValid = await captcha.validateToken(0.5);
      if (!isCaptchaValid) {
        return res.status(400).json({
          message: 'Captcha verification failed',
        });
      }

      // Get note properties
      const noteId = Note.generateDocumentId();
      const accessLinkId = uuidv4();
      // const statusLinkId = uuidv4();

      // Process any images from entityMap
      const entityMap = await Note.uploadImages(noteId, values.content);
      const content = {
        ...values.content,
        entityMap: entityMap,
      };

      // Get hashed password
      const passwordEnabled = values.passwordEnabled;
      const password = await Note.getPassword(passwordEnabled, values.password);

      // Get the encryption key (use password as key if supplied)
      const salt = passwordEnabled ? Crypto.getSalt() : null;
      const key = passwordEnabled
        ? Crypto.getKeyFromPassword(
            Buffer.from(values.password),
            salt as Buffer,
          )
        : Buffer.from(process.env.ENCRYPTION_KEY as string, 'utf-8');

      // Process the rest of the note's properties
      const title = Note.encrypt(values.title, key);
      const encryptedContent = Note.encrypt(JSON.stringify(content), key);
      const expiryDate = dayjs().add(values.expiryMinutes, 'minute').toDate();
      const viewsLimit = values.viewsLimitEnabled ? values.viewsLimit : null;
      const viewsCount = 0;
      const deleteLinkId = values.deleteLinkEnabled ? uuidv4() : null;
      const metadata = Note.createMetadata();

      // Create an instance of a note
      const note = new Note(
        noteId,
        accessLinkId,
        title,
        encryptedContent,
        expiryDate,
        values.expiryMinutes,
        values.viewsLimitEnabled,
        viewsLimit,
        viewsCount,
        values.deleteLinkEnabled,
        deleteLinkId,
        passwordEnabled,
        password,
        salt,
        metadata,
      );

      // Write to the database
      await note.create();

      // Return linkIds back to the front end
      res.status(200).send({
        accessLinkId: note.accessLinkId,
        deleteLinkEnabled: note.deleteLinkEnabled,
        deleteLinkId: note.deleteLinkId,
        expiryDate: note.expiryDate.getTime(),
        viewsLimit: note.viewsLimit,
        viewsLimitEnabled: note.viewsLimitEnabled,
        passwordEnabled: note.passwordEnabled,
      });
    } catch (error) {
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
