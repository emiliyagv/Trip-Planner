import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { FIREBASE_API_KEY } from '../../env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "trip-planner-ac9cb.firebaseapp.com",
  databaseURL: "https://trip-planner-ac9cb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trip-planner-ac9cb",
  storageBucket: "trip-planner-ac9cb.appspot.com",
  messagingSenderId: "512364427839",
  appId: "1:512364427839:web:426651829a6c0266de168a",
  measurementId: "G-3RHRGFGD43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage()





