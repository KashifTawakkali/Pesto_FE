// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage.jsx';
import TaskList from './Components/TaskList.jsx'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tasks" element={<TaskList />} /> 
                    <Route path="/" element={<LoginPage />} /> {/* Redirect to login page by default */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
