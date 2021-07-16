import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const images = [
    '/images/success/undraw_Powerful_re_frhr.svg',
    '/images/success/undraw_High_five_u364.svg',
    '/images/success/undraw_Celebration_re_kc9k.svg',
    '/images/success/undraw_finish_line_katerina_limpitsouni_xy20.svg',
    '/images/success/undraw_winners_ao2o.svg',
    '/images/success/undraw_Having_fun_re_vj4h.svg',
    '/images/success/undraw_Gift_re_qr17.svg',
  ];
  const randomNumber = Math.floor(Math.random() * images.length);
  const heroImage = images[randomNumber];
  return {
    props: {
      heroImage: heroImage,
    },
  };
};
