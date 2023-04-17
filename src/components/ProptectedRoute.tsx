import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (!user) {
    //   router.push('/');
    // }
    // console.log(user);
  }, [router, user]);
  return <>{user ? children : null}</>;
}
