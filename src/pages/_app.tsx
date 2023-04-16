import type { AppProps } from 'next/app';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { ProtectedRoute } from '@/components/ProptectedRoute';

const noAuthRequired = ['/', '/signin', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
