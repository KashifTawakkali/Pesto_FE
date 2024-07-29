// import  { useState } from 'react';
// import '../css/LoginPage.css';

// const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [emailError, setEmailError] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!isValidEmail(email)) {
//             setEmailError(true);
//             setError('Please enter a valid email address');
//             return;
//         }
//         setEmailError(false);
//         // Add API call logic here
//         if (email === 'user@example.com' && password === 'password') {
//             window.location.href = '/tasks'; // Redirect to tasks page
//         } else {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         <div className="login-page">
//             <h2>Login</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className={emailError ? 'error-button' : ''}
//                     disabled={emailError}
//                 >
//                     Login
//                 </button>
//             </form>
//             <p className="redirect-link">
//                 Dont have an account? <a href="/register">Register here</a>
//             </p>
//         </div>
//     );
// };

// export default LoginPage;




// LoginForm.js
// import React from 'react';
import '../css/LoginPage.css';

const LoginForm = () => {
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" />
                <button>Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
