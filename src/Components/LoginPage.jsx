import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/LoginPage.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [, setClickedButton] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

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
            navigate('/dashboard'); 
        }
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
    };

    return (
        <div>
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
                <button type="button" onClick={handleLogin}>Log In</button>
                <div className="social">
                    <div className="go" onClick={() => showDialog('Google')}><i className="fab fa-google"></i> Google</div>
                    <div className="fb" onClick={() => showDialog('Facebook')}><i className="fab fa-facebook"></i> Facebook</div>
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
            <ToastContainer />
        </div>
    );
};

export default LoginForm;
