import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().trim().label('Email').required().min(1).max(256).email(),
});
