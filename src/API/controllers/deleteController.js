import axiosInstance from '../interceptor/Interceptor';
import { getTask } from '../controllers/tasklistControllers';

export const deleteTask = async (formData) => {
  try {
    const response = await axiosInstance.delete('/tasks/delete', {
      data: formData, // Pass the formData as the data property inside the config object
    });

    if (response.status === 200) {
      // If deletion is successful, call the getTask function
      const updatedTasks = await getTask();
      return {
        success: true,
        tasks: updatedTasks,  // Return the updated task list
      };
    } else {
      throw new Error('Failed to delete the task.');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while deleting the task.');
    }
  }
};
