import * as yup from 'yup';
import { expiryOptions } from '@page-components/HomePage/types';
import { RawDraftContentState } from 'draft-js';

export const schema = yup.object().shape({
  title: yup.string().trim().label('Title').required().min(3).max(40),
  content: yup
    .mixed()
    .label('Content')
    .test(
      'isValid',
      'Note is a required field',
      (value: RawDraftContentState) => {
        const atLeastOneEntity = Object.keys(value.entityMap).length > 0;
        const blocksValid = !value.blocks.every(
          (block) => block.text === undefined || block.text.trim().length === 0,
        );
        return atLeastOneEntity || blocksValid;
      },
    ),
  expiryMinutes: yup
    .mixed()
    .oneOf(expiryOptions.map((expiryOption) => expiryOption.value))
    .label('Expiry'),
  viewsLimitEnabled: yup.boolean().label('Views limit enabled'),
  viewsLimit: yup
    .number()
    .label('Views limit')
    .test('isValid', 'Views Limit is not valid', (value, context) => {
      if (!context.parent.viewsLimitEnabled) {
        return true;
      }
      if (typeof value !== 'number') {
        return false;
      }
      return value >= 1 && value <= 1000000;
    }),
  deleteLinkEnabled: yup.boolean().label('Manual destruction enabled'),
  passwordEnabled: yup.boolean().label('Password enabled'),
  password: yup
    .string()
    .trim()
    .label('Password')
    .when('passwordEnabled', {
      is: (passwordEnabled: boolean) => passwordEnabled === true,
      then: yup.string().trim().required().min(6).max(50),
      otherwise: yup.string().trim().notRequired(),
    }),
  passwordConfirmation: yup
    .string()
    .trim()
    .label('Confirmation password')
    .when('passwordEnabled', {
      is: (passwordEnabled: boolean) => passwordEnabled === true,
      then: yup
        .string()
        .trim()
        .required()
        .min(6)
        .max(50)
        .oneOf(
          [yup.ref('password')],
          'Confirmation password must match password',
        ),
      otherwise: yup.string().trim().notRequired(),
    }),
});
