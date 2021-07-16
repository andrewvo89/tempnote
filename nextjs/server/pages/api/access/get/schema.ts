import Joi from 'joi';

export const schema = Joi.object({
  captchaToken: Joi.string().trim().required(),
});
