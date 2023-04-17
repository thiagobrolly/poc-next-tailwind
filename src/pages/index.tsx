import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export { default } from './signin';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextpoc.token': token } = parseCookies(ctx);

  // console.log(ctx.req.cookies);

  // console.log(token);

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
