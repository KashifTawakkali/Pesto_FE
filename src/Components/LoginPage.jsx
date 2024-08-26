import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../css/LoginPage.css';
import { loginUser } from '../API/controllers/loginController';
import Loader from './loader'; 
import 'react-toastify/dist/ReactToastify.css'; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [, setClickedButton] = useState(null);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const showDialog = (buttonName) => {
        setClickedButton(buttonName);
        setDialogVisible(true);
        setTimeout(() => {
            setDialogVisible(false);
            setClickedButton(null);
        }, 3000);
    };

    const handleLogin = () => {
        let valid = true;

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email');
            valid = false;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters');
            valid = false;
        }

        if (valid) {
            setShouldSubmit(true);
        }
    };

    useEffect(() => {
        const login = async () => {
            if (shouldSubmit) {
                setLoading(true);
                try {
                    const formData = { email, password };
                    await loginUser(formData);
                    toast.success('Login successful!');
                    navigate('/dashboard');
                } catch (error) {
                    toast.error(error.message || 'Login failed.');
                } finally {
                    setShouldSubmit(false);
                    setLoading(false);
                }
            }
        };

        login();
    }, [shouldSubmit, email, password, navigate]);

    const handleCloseDialog = () => {
        setDialogVisible(false);
    };

    return (
        <div>
            {loading && <Loader />} {/* Display the loader when loading */}
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" style={{ color: 'white' }} onClick={handleLogin}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                <div className="social">
                    <div className="go" onClick={() => showDialog('Google')}>
                        <i className="fab fa-google"></i> Google
                    </div>
                    <div className="fb" onClick={() => showDialog('Facebook')}>
                        <i className="fab fa-facebook"></i> Facebook
                    </div>
                </div>
            </form>
            {dialogVisible && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>Upcoming Feature...!</p>
                        <button onClick={handleCloseDialog}>Close</button>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default LoginForm;
