import * as yup from 'yup';

export const schema = yup.object().shape({
  password: yup.string().trim().required().min(1).max(50),
});
