import React, { FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
// import { useRouter } from 'next/router';

export default function Signin() {
  // const router = useRouter();
  const { login, loadingAuth } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>

          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">{loadingAuth ? 'loading...' : 'Login'}</button>
          {error && <span>Error</span>}
          <Link href="/signup">Sign Up</Link>
        </form>
      </div>
    </div>
  );
}
