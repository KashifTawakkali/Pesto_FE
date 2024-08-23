import { useState } from 'react';
import TaskForm from './taskForm';
import '../css/TaskList.css';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([
        { no: 'TSK001', name: 'Task 1', status: 'Active' },
        { no: 'TSK002', name: 'Task 2', status: 'On Hold' },
        { no: 'TSK003', name: 'Task 3', status: 'Complete' },
        { no: 'TSK004', name: 'Task 4', status: 'Active' },
        { no: 'TSK005', name: 'Task 5', status: 'On Hold' },
        { no: 'TSK006', name: 'Task 6', status: 'Complete' },
    ]);

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [taskToDelete, setTaskToDelete] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const handleStatusChange = (taskNo, newStatus) => {
        setTasks(tasks.map(task =>
            task.no === taskNo ? { ...task, status: newStatus } : task
        ));
    };

    const handleDeleteTask = () => {
        setTasks(tasks.filter(task => task.no !== taskToDelete));
        setTaskToDelete('');
        setShowDeleteConfirm(false);
    };

    const filteredTasks = selectedStatus === 'All' ? tasks : tasks.filter(task => task.status === selectedStatus);

    const handleFormClose = () => {
        setShowTaskForm(false);
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className={`task-dashboard-container ${showTaskForm ? 'blur-background' : ''}`}>
                <div className="task-dashboard-header">
                    <h2 className="task-dashboard-heading">AMS (Attendance Management System)</h2>
                    <button className="create-task-button" onClick={() => setShowTaskForm(true)}>
                        <i className="fas fa-plus"></i> Create New Task
                    </button>
                </div>
                <div className="task-boxes">
                    <div className="task-box" onClick={() => setSelectedStatus('New Task')}>New Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('Active')}>Active Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('On Hold')}>On Hold Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('Complete')}>Complete Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('All')}>Show All</div>
                </div>
                <div className="task-chart">
                    <table>
                        <thead>
                            <tr>
                                <th>Task No</th>
                                <th>Task Name</th>
                                <th>Task Action</th>
                                <th>Task Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map(task => (
                                <tr key={task.no}>
                                    <td>{task.no}</td>
                                    <td>{task.name}</td>
                                    <td>
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.no, e.target.value)}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Complete">Complete</option>
                                            <option value="Re-Open">Re-Open</option>
                                        </select>
                                    </td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="delete-task-section">
                    <input
                        type="text"
                        placeholder="Enter Task Number"
                        value={taskToDelete}
                        onChange={(e) => setTaskToDelete(e.target.value)}
                    />
                    <button onClick={() => setShowDeleteConfirm(true)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            {showTaskForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <TaskForm onClose={handleFormClose} />
                    </div>
                </div>
            )}
            {showDeleteConfirm && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>Are you sure you want to delete task {taskToDelete}?</p>
                        <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        <button onClick={handleDeleteTask}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;
