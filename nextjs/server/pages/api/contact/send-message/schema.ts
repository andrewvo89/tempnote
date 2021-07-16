import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().trim().required().min(3).max(50),
  email: Joi.string().trim().email().required().min(5).max(256),
  message: Joi.string().trim().required().min(5).max(500),
  captchaToken: Joi.string().trim().required(),
});
