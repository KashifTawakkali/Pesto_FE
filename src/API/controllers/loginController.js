import axiosInstance from '../interceptor/Interceptor';

export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/login', formData);
    const token = response.data.token;

    // Store the token in sessionStorage
    sessionStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred during login.');
    }
  }
};
