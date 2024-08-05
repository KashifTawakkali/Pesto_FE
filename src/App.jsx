// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage.jsx';
import TaskList from './Components/TaskList.jsx'; 
import './App.css';
import Dashboard from './Components/Dashboard.jsx';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tasks" element={<TaskList />} /> 
                    <Route path="/" element={<RegisterPage />} /> 
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
