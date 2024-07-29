import { useState } from 'react';
import '../css/TaskList.css';

const initialTasks = [
  { id: 'TSK001', name: "Task 1", description: "", status: "New Task", deadline: "", assignee: "", accountable: "" },
  { id: 'TSK002', name: "Task 2", description: "", status: "In Progress", deadline: "", assignee: "", accountable: "" },
  { id: 'TSK003', name: "Task 3", description: "", status: "On Hold", deadline: "", assignee: "", accountable: "" },
  { id: 'TSK004', name: "Task 4", description: "", status: "Complete", deadline: "", assignee: "", accountable: "" },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    deadline: "",
    assignee: "",
    accountable: ""
  });

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const generateTaskId = () => {
    const lastTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id : 'TSK000';
    const nextId = parseInt(lastTaskId.substring(3)) + 1;
    return `TSK${nextId.toString().padStart(3, '0')}`;
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: generateTaskId(),
      name: formValues.name,
      description: formValues.description,
      status: "New Task",
      deadline: formValues.deadline,
      assignee: formValues.assignee,
      accountable: formValues.accountable
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
    setFormValues({ name: "", description: "", deadline: "", assignee: "", accountable: "" });
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTable = (status) => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Assignee</th>
          <th>Accountable</th>
          <th>Deadline</th>
          <th>Actions</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tasks.filter(task => task.status === status).map(task => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.assignee}</td>
            <td>{task.accountable}</td>
            <td>{task.deadline}</td>
            <td>
              <select
                value={task.status}
                onChange={(e) => moveTask(task.id, e.target.value)}
              >
                <option value="New Task">New Task</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Complete">Complete</option>
              </select>
            </td>
            <td>
              <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="task-board">
      <h2>Task Board</h2>
      <button className="create-task-button" onClick={openForm}>+ Add Task</button>
      {showForm && /* ... form logic ... */}
      <div className="task-columns">
        <div className="column">
          <h3>New Task</h3>
          {renderTable("New Task")}
        </div>
        <div className="column">
          <h3>In Progress</h3>
          {renderTable("In Progress")}
        </div>
        {/* Add similar divs for other statuses */}
      </div>
    </div>
  );
}  