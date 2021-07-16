import Captcha from '@server/models/captcha';
import Hash from '@server/utils/hash';
import Note from '@server/models/note';
import { HttpMethods } from '@server/utils/api/types';
import { LinkIdFields } from '@server/models/note/types';
import { RequestBody } from '@server/pages/api/delete/unlock/types';
import { schema } from '@server/pages/api/delete/unlock/schema';
import { validate } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Deletes a note using the delete link ID
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
      const { captchaToken, password } = result.value as RequestBody;

      // Create a captcha object and validate
      const captcha = new Captcha(captchaToken);
      const isCaptchaValid = await captcha.validateToken(0.5);
      if (!isCaptchaValid) {
        // Captcha verification failed
        return res.status(400).end();
      }

      const deleteLinkId = req.query.deleteLinkId as string;
      // If not a valid uuid v4
      if (!validate(deleteLinkId)) {
        // Access link is not valid
        return res.status(400).end();
      }

      const note = await Note.getWithLinkId(deleteLinkId, LinkIdFields.DELETE);
      // If no document returned from the database
      if (!note) {
        // Document already deleted or invalid
        return res.status(200).end();
      }

      // If the note is NOT password protected
      if (note.passwordEnabled) {
        // Do a bcrypt verification on password
        const passwordMatch = await Hash.compare(
          password,
          note.password as string,
        );

        if (!passwordMatch) {
          // Password is incorrect
          return res.status(400).end();
        }
      }
      note.delete();
      res.status(200).end();
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
