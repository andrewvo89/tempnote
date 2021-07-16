import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().trim().required().min(3).max(25).label('Name'),
  content: yup.string().trim().required().min(10).max(500).label('Use case'),
});
