import { ReactNode, createContext, useContext, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth, db } from '@/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

type UserType = {
  uid: string;
  email: string | null;
  name: string;
};

interface UserContextProps {
  isAuthenticated: boolean;
  user: UserType | null;
  signUp: (email: string, password: string, name: string) => void;
  signIn: (email: string, password: string) => void;
  logout: () => void;
  loadingAuth: boolean;
}

const AuthContext = createContext({} as UserContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

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

  async function signIn(email: string, password: string) {
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

        setUser(data);
        setLoadingAuth(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  // const signIn = (email: string, password: string) => {
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signUp,
        signIn,
        logout,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
