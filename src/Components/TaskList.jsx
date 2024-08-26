import { useState, useEffect } from 'react';
import TaskForm from './taskForm';
import { getTask } from '../API/controllers/tasklistControllers';
import { updateTask } from '../API/controllers/updateTaskController';
import { deleteTask } from '../API/controllers/deleteController';
import '../css/TaskList.css';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [taskToDelete, setTaskToDelete] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTask();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = async () => {
        try {
            const formData = {
                taskNumber: taskToDelete, // Pass taskNumber from the input field
            };

            const result = await deleteTask(formData);

            if (result.success) {
                setTasks(result.tasks); // Update the task list with the remaining tasks
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
        } finally {
            setShowDeleteConfirm(false);
            setTaskToDelete(''); // Clear the task number input
        }
    };

    const handleStatusChange = async (taskNo, newStatus) => {
        try {
            const statusMapping = {
                'New': 'New',
                'Active': 'In Progress',
                'On Hold': 'On Hold',
                'Complete Task': 'Complete',
                'Re-Open': 'Reopened'
            };

            const requestBody = {
                taskNumber: taskNo,
                status: statusMapping[newStatus],
            };

            await updateTask(requestBody);

            setTasks(tasks.map(task =>
                task.taskNumber === taskNo ? { ...task, status: newStatus } : task
            ));
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    const filteredTasks = tasks.filter(task =>
        selectedStatus === 'All' ? true : task.status.toLowerCase() === selectedStatus.toLowerCase()
    );

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
                    <div className="task-box" onClick={() => setSelectedStatus('new')}>New Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('active')}>Active Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('on hold')}>On Hold Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('complete task')}>Complete Task</div>
                    <div className="task-box" onClick={() => setSelectedStatus('All')}>Show All</div>
                </div>

                {isLoading ? (
                    <div className="loader">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="no-task-message">
                        No {selectedStatus} tasks available.
                    </div>
                ) : (
                    <div className="task-chart">
                        <table>
                            <thead>
                                <tr>
                                    <th>Task No</th>
                                    <th>Task Name</th>
                                    <th>Task Description</th>
                                    <th>Task Action</th>
                                    <th>Task Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map(task => (
                                    <tr key={task.taskNumber}>
                                        <td>{task.taskNumber}</td>
                                        <td>{task.taskName}</td>
                                        <td>{task.taskDescription}</td>
                                        <td>
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.taskNumber, e.target.value)}
                                            >
                                                <option value="New">New</option>
                                                <option value="Active">Active</option>
                                                <option value="On Hold">On Hold</option>
                                                <option value="Complete Task">Complete Task</option>
                                                <option value="Re-Open">Re-Open</option>
                                            </select>
                                        </td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

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
                        <button onClick={handleDeleteTask}>Delete</button> {/* Trigger delete on confirmation */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;
