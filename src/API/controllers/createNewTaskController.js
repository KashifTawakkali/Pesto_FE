import axiosInstance from '../interceptor/Interceptor';

export const createTask = async (formData) => {
  try {
    const response = await axiosInstance.post('/tasks/create', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while registering.');
    }
  }
};
