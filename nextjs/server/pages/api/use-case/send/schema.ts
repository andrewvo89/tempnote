import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().trim().required().min(3).max(25),
  content: Joi.string().trim().required().min(10).max(500),
  captchaToken: Joi.string().trim().required(),
});
