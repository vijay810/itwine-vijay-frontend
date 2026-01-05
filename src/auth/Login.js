import React, { useState, useEffect, useCallback } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';

function Login() {
    const clearForm = {
        email: "",
        password: "",
        role: "",
    };
    const clearForgotForm = {
        username: "",
        newpassword: "",
        confirmpassword: "",
    }

    const [isFlipped, setIsFlipped] = useState(false);
    const [loginForm, setLoginForm] = useState(clearForm);
    const [forgotpswForm, setForgotpswForm] = useState(clearForgotForm)
    const [showPassword, setShowPassword] = useState(false);
    const [newshowPassword, setNewshowPassword] = useState(false);
    const [confirmshowPassword, setConfirmshowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Memoize the checkTokenValidity function
    const checkTokenValidity = useCallback(async () => {
        const token = localStorage.getItem('token'); // get token
        if (!token) {
            console.log("No token in localStorage, skipping verification");
            return;
        }

        try {
            const apiUrl = `${process.env.REACT_APP_API}/auth/verify-token`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}` // <-- only send if token exists
                }
            });

            console.log("Token valid:", response.data);

        } catch (error) {
            console.error("Token verification failed:", error.response?.data);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('loginForm');
                setErrorMessage('Session expired. Please log in again.');
                setTimeout(() => navigate('/'), 1000);
            }
        }
    }, [navigate]);




    useEffect(() => {
        const localStoragedata = localStorage.getItem('loginForm');
        if (localStoragedata) {
            const loginForm = JSON.parse(localStoragedata);
            console.log(loginForm.role);
        }

        const savedForm = JSON.parse(localStorage.getItem('loginForm'));
        if (savedForm) {
            setLoginForm(savedForm);
            setRememberMe(true);
        }

        checkTokenValidity(); // once on mount

        let activityTimeout;

        const handleUserActivity = () => {
            clearTimeout(activityTimeout);

            activityTimeout = setTimeout(() => {
                checkTokenValidity(); // refresh ONLY if user is active
            }, 1000); // 1 second after activity
        };

        // User activity events
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('click', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);

        return () => {
            clearTimeout(activityTimeout);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
        };
    }, [checkTokenValidity]);




    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const confirmPswd = () => {
        setConfirmshowPassword(!confirmshowPassword);
    }

    const newPswd = () => {
        setNewshowPassword(!newshowPassword);
    }
    const inputsHandler = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const inputsPswdHandler = (e) => {
        setForgotpswForm({
            ...forgotpswForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };


    /* Old Code */
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const apiUrl = "http://localhost:4000/auth/login";
    //         const response = await axios.post(apiUrl, loginForm);
    //         const { token, name } = response.data;

    //         setSuccessMessage("Login Successfully");
    //         setLoginForm(clearForm);
    //         if (rememberMe) {
    //             localStorage.setItem('loginForm', JSON.stringify(loginForm));
    //             localStorage.setItem('token', token); // Save the token as well
    //             localStorage.setItem('name', name); // Save the user's name
    //         } else {
    //             localStorage.removeItem('loginForm');
    //             localStorage.setItem('token', token); // Save the token if not remembered
    //             localStorage.setItem('name', name); // Save the user's name
    //         }
    //         setTimeout(() => {
    //             navigate("/user-dashboard");
    //             setSuccessMessage("");
    //         }, 2000);

    //     } catch (error) {
    //         setErrorMessage(error.response?.data?.msg || 'Login failed');
    //         setTimeout(() => {
    //             setErrorMessage('');
    //         }, 1000)
    //     }
    // };

    /* new code     */
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const localStoragedata = localStorage.getItem('loginForm');
    //     if (localStoragedata) {
    //         const loginForm = JSON.parse(localStoragedata);
    //         const role = loginForm.role
    //         console.log(role)
    //     } else {
    //         console.log('No login form data found in localStorage.');
    //     }

    //     try {
    //         // const apiUrl = `http://localhost:4000/auth/login`;
    //         console.log('API URL:', process.env.REACT_APP_API);

    //         const apiUrl = `${process.env.REACT_APP_API}/auth/login`;
    //         const response = await axios.post(apiUrl, loginForm);
    //         const { token, name, role } = response.data;
    //         setSuccessMessage("Login Successfully");

    //         setLoginForm(clearForm);


    //         if (rememberMe) {
    //             localStorage.setItem('loginForm', JSON.stringify(loginForm));
    //             localStorage.setItem('token', token);
    //             localStorage.setItem('name', name);
    //         } else {
    //             localStorage.removeItem('loginForm');
    //             localStorage.setItem('token', token);
    //             localStorage.setItem('name', name);
    //         }

    //         setTimeout(() => {
    //             if (role === 1) {
    //                 navigate("/admin-dashboard");
    //             } else if (role === 2) {
    //                 navigate("/user-dashboard");
    //             } else {
    //                 navigate("/");
    //             }


    //             setSuccessMessage("");
    //         }, 2000);

    //     } catch (error) {
    //         setErrorMessage(error.response?.data?.msg || 'Login failed');
    //         setTimeout(() => {
    //             setErrorMessage('');
    //         }, 1000);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `${process.env.REACT_APP_API}/auth/login`;
            const response = await axios.post(apiUrl, loginForm);

            const { token, name, role, user_id } = response.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('user_id', user_id);

            if (rememberMe) {
                localStorage.setItem('loginForm', JSON.stringify(loginForm));
            } else {
                localStorage.removeItem('loginForm');
            }
            setSuccessMessage("Login Successful"); // <-- set success message
            setErrorMessage('');
            setLoginForm(clearForm);

            setTimeout(() => {
                if (role === 1) navigate("/admin-dashboard");
                else if (role === 2) navigate("/user-dashboard");
                else navigate("/");
                setSuccessMessage("");
            }, 1500);

        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Login failed');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };





    const forgotPswdCard = () => {
        setIsFlipped(true);
    };

    // const backToLogin = () => {
    //     setIsFlipped(false);
    // };



    const submitupdateBtn = async (e) => {
        e.preventDefault();

        console.log(forgotpswForm);
        setForgotpswForm(clearForgotForm)
        setSuccessMsg("Successfully Changed Password")
        setTimeout(() => {
            setSuccessMsg('')
            setIsFlipped(false);
        }, 1000)
    }


    return (
        <>

            <div className='container-fluid backBg px-0'>
                <div className='background-design row mx-0'>

                    <div className='container col d-flex align-items-center justify-content-center min-vh-100'>

                        <div className={`cards-flip ${isFlipped ? 'flip' : ''}`}>
                            <div className='d-flex justify-content-center d-sm-none'>
                                <img src="./images/logo3.png" alt="" width={150} style={{ filter: 'hue-rotate(300deg)'}} />
                            </div>
                            <div className='card signIn-face signIn-front'>
                               
                                <p className='fw-bold h1 text-center py-2 mb-0'>Sign In</p>
                                <p className='mb-0 pt-2 pb-4 small text-center'>Please enter your username and password!</p>

                                <form onSubmit={handleSubmit}>
                                    <div className="card-body p-0" style={{ minHeight: 235 }}>
                                        <div className="input-container mb-3">
                                            <input
                                                className="input-text"
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={loginForm.email}
                                                onChange={inputsHandler}
                                                placeholder=" "
                                                required
                                            />
                                            <label className="input-label" htmlFor="email">Username</label>
                                        </div>

                                        <div className="input-container mb-3">
                                            <input
                                                className="input-text"
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={loginForm.password}
                                                onChange={inputsHandler}
                                                placeholder=" "
                                                required
                                            />
                                            <label className="input-label" htmlFor="password">Password</label>
                                            <div className="eye-icon pb-2" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                        </div>

                                        <div className="input-container">
                                            <select
                                                className="input-text"
                                                id="role"
                                                name="role"
                                                value={loginForm.role}
                                                onChange={inputsHandler}
                                                placeholder=" "
                                                required
                                            >
                                                <option value="" disabled>Select role</option>
                                                <option value="1">Admin</option>
                                                <option value="2">User</option>
                                                <option value="3">Client</option>
                                            </select>
                                        </div>
                                        <div className="form-check d-flex pb-2">
                                            <input
                                                className="form-check-input border border-secondary"
                                                type="checkbox"
                                                id="rememberMe"
                                                checked={rememberMe}
                                                onChange={handleRememberMeChange}
                                            />
                                            <label className='ps-1' htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                            <Link className='text-end ms-auto flip-forgot-card' onClick={forgotPswdCard}>Forgot password?</Link>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            {successMessage && <p className='text-success my-0 py-0'>{successMessage}</p>}
                                            {errorMessage && <p className='text-danger my-0 py-0'>{errorMessage}</p>}
                                        </div>
                                    </div>
                                    <div className="card-footer border-0 text-center mb-auto px-0 ">
                                        <div>
                                            <button type='submit' className='btn btn-info signinBtn'>Login</button>
                                            <p className="text-center my-0 small py-0">Click here to <Link to='/register'>register</Link> if you don't have an account.</p>
                                        </div>
                                    </div>
                                </form>


                            </div>
                            <div className="card signIn-face forgot-back">
                                <h1 className='fw-bold h3 text-center pt-4 mb-0'>Forgot password</h1>
                                <form>
                                    <div className='card-body'>
                                        <div className="input-container my-4">
                                            <input
                                                className="input-text"
                                                type="email"
                                                id="username"
                                                name="username"
                                                value={forgotpswForm.username}
                                                onChange={inputsPswdHandler}
                                                placeholder=" "
                                                required
                                            />
                                            <label className="input-label" htmlFor="email">Username</label>
                                        </div>
                                        <div className="input-container mb-4">
                                            <input
                                                className="input-text"
                                                type={newshowPassword ? 'text' : 'password'}
                                                id="newpassword"
                                                name="newpassword"
                                                value={forgotpswForm.newpassword}
                                                onChange={inputsPswdHandler}
                                                placeholder=" "
                                                required
                                            />
                                            <label className="input-label" htmlFor="newpassword">New Password</label>
                                            <div className="eye-icon pb-2" onClick={newPswd}>
                                                {newshowPassword ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                        </div>
                                        <div className="input-container mb-4">
                                            <input
                                                className="input-text"
                                                type={confirmshowPassword ? 'text' : 'password'}
                                                id="confirmpassword"
                                                name="confirmpassword"
                                                value={forgotpswForm.confirmpassword}
                                                onChange={inputsPswdHandler}
                                                placeholder=" "
                                                required
                                            />
                                            <label className="input-label" htmlFor="confirmpassword">Confirm Password</label>
                                            <div className="eye-icon pb-2" onClick={confirmPswd}>
                                                {confirmshowPassword ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                        </div>

                                        <div className='text-center'>
                                            <p className='text-success'>{successMsg}</p>
                                        </div>
                                    </div>
                                    <div className='card-footer border-0 forgot-button'>
                                        <div className=' d-grid'>
                                            <button type='submit' className='btn btn-info' onClick={submitupdateBtn}>Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col d-none d-sm-block'>
                        <img src="./images/logo3.png" alt="" />
                        <div>
                            <img className="loginpng" src="./images/l.png" alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
