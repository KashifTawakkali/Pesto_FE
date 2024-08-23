import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pesto-be.vercel.app/api/v1/"
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); 

  if (token) {
    config.headers.Authorization = `${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default axiosInstance;
