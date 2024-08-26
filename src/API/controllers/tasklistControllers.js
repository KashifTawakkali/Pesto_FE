import axiosInstance from '../interceptor/Interceptor';

export const getTask = async (formData) => {
  try {
    const response = await axiosInstance.get('/tasks/all', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while getting all tasks.');
    }
  }
};
