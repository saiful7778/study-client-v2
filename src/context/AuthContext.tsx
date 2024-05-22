import { useAxios } from "@/hooks/useAxios";
import { toast } from "@/hooks/useToast";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as logOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ReactNode, createContext, useState, FC, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  userData: object | undefined;
  token: string | undefined;
  loader: boolean;
  googleAuth: () => Promise<UserCredential>;
  signUp: (email: string, pass: string) => Promise<UserCredential>;
  signIn: (email: string, pass: string) => Promise<UserCredential>;
  singOut: () => Promise<void>;
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

  const signUp = (email: string, pass: string) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signIn = (email: string, pass: string) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const singOut = () => {
    setLoader(true);
    return logOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios
          .post("/authentication/sign_in", { userEmail: currentUser?.email })
          .then(({ data }) => {
            setUserData(data.userData);
            setToken(data.token);
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Error to sign in server",
            });
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
        signUp,
        signIn,
        singOut,
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
