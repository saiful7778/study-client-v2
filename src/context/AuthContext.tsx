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
  onAuthStateChanged,
} from "firebase/auth";
import { ReactNode, createContext, useState, FC, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  userData: object | undefined;
  token: string | undefined;
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
  const [userData, setUserData] = useState<object | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios
          .post("/authentication/login", { userEmail: currentUser?.email })
          .then(({ data }) => {
            setUserData(data.userData);
            setToken(data.token);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setUserData(undefined);
        setToken(undefined);
      }

      setLoader(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axios]);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logOut,
        googleAuth,
        loader,
        user,
        userData,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
