import  { useState } from 'react';
import PropTypes from 'prop-types';
import { createTask } from '../API/controllers/createNewTaskController'; 
import '../css/taskForm.css';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    assignee: '',
    assigneeTo: '', 
    deadline: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      accountable: formData.assigneeTo, 
    };
    delete requestData.assigneeTo; 

    try {
      await createTask(requestData);
      onClose();
      document.getElementById('task-form').reset();
      alert('Task created successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    onClose();
    document.getElementById('task-form').reset();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <form id="task-form" className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input 
              type="text" 
              id="taskName" 
              name="taskName" 
              value={formData.taskName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea 
              id="taskDescription" 
              name="taskDescription" 
              rows="4" 
              value={formData.taskDescription} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <input 
              type="text" 
              id="assignee" 
              name="assignee" 
              value={formData.assignee} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="assigneeTo">Assignee To:</label>
            <input 
              type="text" 
              id="assigneeTo" 
              name="assigneeTo" 
              value={formData.assigneeTo} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline Date:</label>
            <input 
              type="date" 
              id="deadline" 
              name="deadline" 
              value={formData.deadline} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Create Task</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TaskForm;
