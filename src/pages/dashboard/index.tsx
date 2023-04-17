import { useAuth } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dasboard</h1>
      <p>Bem vindo, {user?.name}</p>
      <button
        type="button"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextpoc.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
