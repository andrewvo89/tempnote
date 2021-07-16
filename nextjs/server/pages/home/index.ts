import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const images = [
    '/images/home/undraw_annotation_7das.svg',
    '/images/home/undraw_Notebook_re_id0r.svg',
    '/images/home/undraw_Task_re_wi3v.svg',
    '/images/home/undraw_Website_builder_re_ii6e.svg',
    '/images/home/undraw_Add_tasks_re_s5yj.svg',
    '/images/home/undraw_Wireframing_re_q6k6.svg',
    '/images/home/undraw_secure_files_re_6vdh.svg',
  ];
  const randomNumber = Math.floor(Math.random() * images.length);
  const heroImage = images[randomNumber];
  return {
    props: {
      heroImage: heroImage,
    },
  };
};
