import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dasboard</h1>
      <p>Bem vindo, {user?.name}</p>
      <button
        type="button"
        onClick={() => {
          logout();
          router.push('/');
        }}
      >
        Logout
      </button>
    </div>
  );
}
