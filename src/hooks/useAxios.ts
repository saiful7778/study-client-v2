// import { useEffect } from "react";
// import useAuth from "@/hooks/useAuth";
// import { useNavigate } from "@tanstack/react-router";
import axiosConfig from "@/lib/config/axios.config";

// export const useAxiosSecure = () => {
//   const { logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axiosConfig.interceptors.response.use(
//       (res) => {
//         return res;
//       },
//       (err) => {
//         if (err.response.status === 401 || err.response.status === 403) {
//           logOut()
//             .then(() => {
//               navigate("/login");
//             })
//             .catch((err) => console.error(err));
//         }
//       }
//     );
//   }, []);
//   return axiosConfig;
// };

export const useAxios = () => {
  return axiosConfig;
};
