import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../css/RegisterPage.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(error => toast.error(error)); 
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            //  navigate to login page
            navigate('/login');
        }
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Register Here</h3>
                <div className="grid-container">
                    <div className="grid-item">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="confirmPassword">Confirm Pass</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="toggle-form">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
                <button type="submit">Register</button>
            </form>
            <ToastContainer /> {/* Add ToastContainer */}
        </div>
    );
};

export default RegisterForm;
