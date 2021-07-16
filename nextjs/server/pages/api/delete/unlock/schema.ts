import Joi from 'joi';

export const schema = Joi.object({
  password: Joi.string().trim().min(1).max(50).allow(''),
  captchaToken: Joi.string().trim().required(),
});
