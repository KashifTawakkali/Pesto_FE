import axiosInstance from '../interceptor/Interceptor';

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/register', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while registering.');
    }
  }
};
