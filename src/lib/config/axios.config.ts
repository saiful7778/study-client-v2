import axios from "axios";

const axiosConfig = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: "https://study-server.vercel.app",
});

export default axiosConfig;
