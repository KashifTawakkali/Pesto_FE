import  { useState } from 'react';
import '../css/TaskList.css';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([
        { no: 'TSK001', name: 'Task 1', status: 'Active' },
        { no: 'TSK002', name: 'Task 2', status: 'On Hold' },
        { no: 'TSK003', name: 'Task 3', status: 'Complete' },
    ]);

    const handleStatusChange = (taskNo, newStatus) => {
        setTasks(tasks.map(task => 
            task.no === taskNo ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className="task-dashboard-container">
                <h2 className="task-dashboard-heading">AMS (Attendance Management System)</h2>
                <div className="task-boxes">
                    <div className="task-box">New Task</div>
                    <div className="task-box">Active Task</div>
                    <div className="task-box">On Hold Task</div>
                    <div className="task-box">Complete Task</div>
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
                            {tasks.map(task => (
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
            </div>
        </div>
    );
};

export default TaskDashboard;
