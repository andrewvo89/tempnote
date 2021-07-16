import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string().trim().email().required().min(1).max(256),
  captchaToken: Joi.string().trim().required(),
});
