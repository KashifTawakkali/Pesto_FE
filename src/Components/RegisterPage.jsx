import '../css/RegisterPage.css';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Register Here</h3>
                <div className="grid-container">
                    <div className="grid-item">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Full Name" id="name" />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" id="email" />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password" />
                    </div>
                    <div className="grid-item">
                        <label htmlFor="confirmPassword">Confirm Pass</label>
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" />
                    </div>
                </div>
                <div className="toggle-form">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
                <button>Register</button>
               
                
            </form>
        </div>
    );
};

export default RegisterForm;
