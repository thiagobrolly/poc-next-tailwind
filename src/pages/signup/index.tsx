import React, { FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function SignUp() {
  const { signUp, loadingAuth } = useAuth();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    try {
      await signUp(email, password, name);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  return (
    <div>
      <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSignup}>
          <label htmlFor="name">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="name"
              name="name"
              id="name"
              placeholder="John Doe"
            />
          </label>

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
          <button type="submit">
            {loadingAuth ? 'loading...' : 'Sign up'}
          </button>
          {error && <span>Error</span>}
          <Link href="/">Login</Link>
        </form>
      </div>
    </div>
  );
}
