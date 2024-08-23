import PropTypes from 'prop-types';
import '../css/taskForm.css';

const TaskForm = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
    document.getElementById('task-form').reset();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <form id="task-form" className="task-form">
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input type="text" id="taskName" name="taskName" required />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea id="taskDescription" name="taskDescription" rows="4" required />
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <input type="text" id="assignee" name="assignee" required />
          </div>

          <div className="form-group">
            <label htmlFor="assigneeTo">Assignee To:</label>
            <input type="text" id="assigneeTo" name="assigneeTo" required />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline Date:</label>
            <input type="date" id="deadline" name="deadline" required />
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
