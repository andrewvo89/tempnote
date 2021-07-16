import Joi from 'joi';
import { expiryValues } from '@server/utils/note';
import { RawDraftContentState } from 'draft-js';

export const schema = Joi.object({
  title: Joi.string().trim().required().min(3).max(40),
  content: Joi.object({
    blocks: Joi.array().items(Joi.object()),
    entityMap: Joi.object(),
  }).custom((value: RawDraftContentState) => {
    const atLeastOneEntity = Object.keys(value.entityMap).length > 0;
    const blocksValid = !value.blocks.every(
      (block) => block.text === undefined || block.text.trim().length === 0,
    );
    if (!(atLeastOneEntity || blocksValid)) {
      throw new Error('Content is not valid');
    }
    return value;
  }),
  expiryMinutes: Joi.number().valid(...expiryValues),
  viewsLimitEnabled: Joi.boolean(),
  viewsLimit: Joi.number().min(1).max(1000000),
  deleteLinkEnabled: Joi.boolean(),
  passwordEnabled: Joi.boolean(),
  password: Joi.when('$passwordEnabled', {
    is: true,
    then: Joi.string().trim().min(6).max(50),
    otherwise: Joi.string().trim().allow(''),
  }),
  passwordConfirmation: Joi.when('$passwordEnabled', {
    is: true,
    then: Joi.string().trim().equal(Joi.ref('password')),
    otherwise: Joi.string().trim().allow(''),
  }),
  captchaToken: Joi.string().trim().required(),
});
