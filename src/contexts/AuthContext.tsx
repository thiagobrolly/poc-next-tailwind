import { ReactNode, createContext, useContext, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  // PhoneAuthProvider,
  // signInWithCredential,
} from 'firebase/auth';
import { auth, db } from '@/services/firebase';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

type User = {
  email: string | null;
  name: string;
};

type SignInData = {
  email: string;
  password: string;
};

interface UserContextProps {
  isAuthenticated: boolean;
  user: User | null;
  signUp: (email: string, password: string, name: string) => void;
  signIn: (data: SignInData) => Promise<void>;
  testPhone: () => void;
  // handleVerifyCode: () => Promise<string>;
  // handleVerifyCode: () => void;
  logout: () => void;
  loadingAuth: boolean;
}

const AuthContext = createContext({} as UserContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  // const [verificationId, setVerificationId] = useState('');

  const isAuthenticated = !!user;

  async function signUp(email: string, password: string, name: string) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        const uid = value.user.uid;

        await setDoc(doc(db, 'users', uid), {
          name,
        }).then(() => {
          const data = {
            uid,
            name,
            email: value.user.email,
          };

          setUser(data);
          setLoadingAuth(false);
          router.push('/dashboard');
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  function testPhone() {
    setLoadingAuth(true);
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
      },
      auth,
    );

    // const appVerifier = window.recaptchaVerifier;

    const number = '+55 11 22334-4555	';
    console.log(number);

    signInWithPhoneNumber(auth, number, recaptchaVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult.verificationId);
        // setVerificationId(confirmationResult.verificationId);
        // window.confirmationResult = confirmationResult;
        confirmationResult.confirm('123456').then(async (result) => {
          const user = result.user;
          console.log(user);

          const uid = user.uid;

          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);

          console.log(docSnap);

          const data = {
            uid,
            name: docSnap.data()?.name,
            email: docSnap.data()?.email,
          };

          user.getIdToken().then((token) => {
            setCookie(undefined, 'nextpoc.token', token, {
              maxAge: 60 * 60 * 1, // 1hour
            });
          });

          console.log(data);

          setUser(data);
          setLoadingAuth(false);
          router.push('/dashboard');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const handleVerifyCode = () => {
  //   const credential = PhoneAuthProvider.credential(verificationId, '123456');
  //   console.log(credential);

  //   signInWithCredential(credential);
  // };

  async function signIn({ email, password }: SignInData) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        const uid = value.user.uid;

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        const data = {
          uid,
          name: docSnap.data()?.name,
          email: value.user.email,
        };

        value.user.getIdToken().then((token) => {
          setCookie(undefined, 'nextpoc.token', token, {
            maxAge: 60 * 60 * 1, // 1hour
          });
        });

        setUser(data);
        setLoadingAuth(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  const logout = async () => {
    destroyCookie(undefined, 'nextpoc.token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signUp,
        signIn,
        logout,
        loadingAuth,
        testPhone,
        // handleVerifyCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
