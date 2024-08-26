import axiosInstance from '../interceptor/Interceptor';

import { toast } from "react-toastify";

export const loginUser = async (formData) => {
  const endpoint = "/auth/login";

  try {
    const response = await axiosInstance.post(endpoint, formData);
    const token = response.data.token;

    sessionStorage.setItem("token", token);

    toast.success("Login successful");

    return response.data;
  } catch (error) {
    toast.error("Failed to log in", error);

    throw error;
  }
};
