import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  // baseURL: "https://study-server-v2.vercel.app",
});

export default axiosConfig;
