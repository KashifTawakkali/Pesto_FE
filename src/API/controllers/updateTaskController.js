import axiosInstance from "../interceptor/Interceptor";
import { toast } from "react-toastify";

export const updateTask = async (formData) => {
  const endpoint = "/tasks/update";

  try {
    const response = await axiosInstance.post(endpoint, formData);
    toast.success("Task updated successfully");

    return response.data;
  } catch (error) {
    toast.error("Failed to update task", error);

    throw error;
  }
};
