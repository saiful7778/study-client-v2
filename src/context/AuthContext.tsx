import { useAxios } from "@/hooks/useAxios";
import { toast } from "@/hooks/useToast";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, createContext, useState, FC, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  userData:
    | {
        _id: string;
        userEmail: string;
        userToken: string;
        userRole: string;
        userBadge: string;
      }
    | undefined;
  token: string | undefined;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<
    | {
        _id: string;
        userEmail: string;
        userToken: string;
        userRole: string;
        userBadge: string;
      }
    | undefined
  >(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(true);

  const axios = useAxios();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && currentUser?.emailVerified) {
        localStorage.setItem("auth", currentUser.email!);
        axios
          .post("/authentication/sign_in", { userEmail: currentUser?.email })
          .then(({ data }) => {
            setUserData(data.userData);
            setToken(data.token);
          })
          .catch(() => {
            signOut(auth);
            localStorage.setItem("auth", "");
            setUser(null);
            setUserData(undefined);
            setToken(undefined);
            toast({
              variant: "destructive",
              title: "Error to sign in server",
            });
          });
      } else {
        localStorage.setItem("auth", "");
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
        setLoader,
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
