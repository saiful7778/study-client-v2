import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as logOut,
} from "firebase/auth";
import useAuthInfo from "./useAuthInfo";

const googleProvider = new GoogleAuthProvider();

export default function useAuth() {
  const { setLoader } = useAuthInfo();
  const googleAuth = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signUp = (email: string, pass: string) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signIn = (email: string, pass: string) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const resetPass = (email: string) => sendPasswordResetEmail(auth, email);

  const signOut = () => {
    setLoader(true);
    return logOut(auth);
  };

  return {
    googleAuth,
    signUp,
    signIn,
    signOut,
    resetPass,
  };
}
