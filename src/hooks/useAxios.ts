import { useEffect } from "react";
import axiosConfig from "@/lib/config/axios.config";
import useAuth from "./useAuth";
import useNavigatePage from "./useNavigatePage";
import { AxiosInstance } from "axios";
import { toast } from "./useToast";

export function useAxiosSecure(): AxiosInstance {
  const { signOut } = useAuth();
  const navigate = useNavigatePage();

  useEffect(() => {
    axiosConfig.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          try {
            await signOut();
            navigate("/sign-in");
          } catch (err) {
            if (err instanceof Error) {
              toast({
                variant: "destructive",
                title: "Unauthorized access",
              });
            }
          }
        }
      },
    );
  }, [signOut, navigate]);
  return axiosConfig;
}

export function useAxios(): AxiosInstance {
  return axiosConfig;
}
