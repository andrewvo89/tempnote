import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().trim().label('Full name').required().min(3).max(50),
  email: yup.string().trim().label('Email').required().min(5).max(256).email(),
  message: yup.string().trim().label('Message').required().min(5).max(500),
});
