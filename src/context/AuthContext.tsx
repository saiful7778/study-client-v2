import { useAxios } from "@/hooks/useAxios";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useState, FC } from "react";

interface AuthContextType {
  user: User | null;
  loader: boolean;
  googleAuth: () => Promise<UserCredential>;
  register: (email: string, pass: string) => Promise<UserCredential>;
  login: (email: string, pass: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
const googleProvider = new GoogleAuthProvider();

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const axios = useAxios();

  const googleAuth = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const register = (email: string, pass: string) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email: string, pass: string) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    setLoader(true);
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ register, login, logOut, googleAuth, loader, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
