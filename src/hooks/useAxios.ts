import { useEffect } from "react";
import axiosConfig from "@/lib/config/axios.config";
import useAuth from "./useAuth";
import useNavigatePage from "./useNavigatePage";
import { AxiosInstance } from "axios";

export function useAxiosSecure(): AxiosInstance {
  const { signOut } = useAuth();
  const navigate = useNavigatePage();

  useEffect(() => {
    axiosConfig.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          signOut()
            .then(() => {
              navigate("/sign-in");
            })
            .catch((err) => console.error(err));
        }
      },
    );
  }, [signOut, navigate]);
  return axiosConfig;
}

export function useAxios(): AxiosInstance {
  return axiosConfig;
}
