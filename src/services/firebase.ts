import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBa8mzjL_AxvyAG7shsKdbgOoviAJujkaA',
  authDomain: 'poc-next13.firebaseapp.com',
  projectId: 'poc-next13',
  storageBucket: 'poc-next13.appspot.com',
  messagingSenderId: '157367667495',
  appId: '1:157367667495:web:df1cdea9103150c336f702',
  measurementId: 'G-JRB8161C9T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
