import React, { FormEvent, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
export default function Signin() {
  const { signIn, loadingAuth, testPhone } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const data = { email, password };

    try {
      await signIn(data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleOTP = async () => {
    // const data = { email, password };

    try {
      await testPhone();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // const handlePhone = async (event: FormEvent) => {
  //   event.preventDefault();

  //   // await handleVerifyCode();

  //   // const data = { email, password };

  //   // try {
  //   //   await testPhone();
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   setError(true);
  //   // }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="max-w-sm w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="/signup"
              >
                Create an account
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={handleOTP}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loadingAuth ? 'loading...' : 'OTP'}
            </button>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loadingAuth ? 'loading...' : 'Sign in'}
            </button>
          </div>

          {error && <span>Error</span>}
          {/* <Link href="/signup">Sign Up</Link> */}
          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
}
