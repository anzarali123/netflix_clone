import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdvvbJYCH3uCc_U9-WxJ2ANK0N0164Mto",
  authDomain: "netflix-clone-54967.firebaseapp.com",
  projectId: "netflix-clone-54967",
  storageBucket: "netflix-clone-54967.appspot.com",
  messagingSenderId: "50740058873",
  appId: "1:50740058873:web:71d092af21c61cb63be028",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!password || !email) {
    alert("Enter your email and password");
    return;
  }
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
  } catch (error) {
    alert(`Error creating the user ${error}`);
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!password || !email) {
    alert("Enter your email and password");
    return;
  }
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    alert(`${error}`);
  }
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => {
  await signOut(auth);
};
