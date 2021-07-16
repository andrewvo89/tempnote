import Captcha from '@server/models/captcha';
import UseCase from '@server/models/use-case';
import { HttpMethods } from '@server/utils/api/types';
import { RequestBody } from '@server/pages/api/use-case/send/types';
import { schema } from '@server/pages/api/use-case/send/schema';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Submit a use case.
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}  {Promise<void>}
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === HttpMethods.POST) {
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

    await UseCase.send(values.name, values.content);
    res.status(200).end();
    try {
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
