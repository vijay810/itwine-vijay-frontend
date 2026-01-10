import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';
function Register({ onBack }) {
    const clearForm = {
        name: "",
        email: "",
        mob: "",
        password: "",
        role: "",
        status: '1'
    };

    const [signupForm, setSignupForm] = useState(clearForm);
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputsHandler = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${process.env.REACT_APP_API}/auth/register`;
            await axios.post(apiUrl, signupForm);
            setSuccessMessage("Successfully Registered");
            // setTimeout(() => {
            //     setSuccessMessage('');
            //     navigate('/');
            // }, 1000);
            setTimeout(() => {
                setSuccessMessage('');
                setSignupForm(clearForm); // 🔥 clear form
                onBack(); // 🔥 switch back to Login
            }, 1500);

        } catch (error) {
            setErrorMessage(error.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <>

            {/* <div className="card">
            <h2 className="text-center">Register</h2>


            <p
                className="text-center text-primary"
                style={{ cursor: 'pointer' }}
                onClick={onBack}
            >
                Back to Login
            </p>
        </div> */}
            <div className='cards-flip '>
                <div className='d-flex itwine-logo justify-content-center d-sm-none'>
                    <img src="./images/logo3.png" alt="" width={150} style={{ filter: 'hue-rotate(300deg)' }} />
                </div>
                <div className='card signIn-front p-3' >
                    <p className='fw-bold h1 text-center'>Sign Up</p>

                    <form onSubmit={handleSubmit}>
                        <div className='card-body px-0'>
                            <div className="input-container mb-3">
                                <input
                                    type="text"
                                    className="input-text"
                                    id="name"
                                    placeholder=" "
                                    name="name"
                                    value={signupForm.name}
                                    onChange={inputsHandler}
                                    required
                                    autoComplete="name"
                                />
                                <label htmlFor="name" className='input-label'>Enter your name</label>
                            </div>
                            <div className="input-container mb-3">
                                <input
                                    type="email"
                                    className="input-text"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                    value={signupForm.email}
                                    onChange={inputsHandler}
                                    required
                                    autoComplete="email"
                                />
                                <label htmlFor="email" className='input-label'>Enter your email</label>
                            </div>
                            <div className="input-container mb-3">
                                <input
                                    type="text"
                                    className="input-text"
                                    id="mob"
                                    name="mob"
                                    placeholder=" "
                                    value={signupForm.mob}
                                    onChange={inputsHandler}
                                    required
                                    autoComplete="tel"
                                />
                                <label htmlFor="mob" className='input-label'>Enter your mobile number</label>
                            </div>


                            <div className="input-container mb-3">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input-text"
                                    id="password"
                                    name="password"
                                    placeholder=" "
                                    value={signupForm.password}
                                    onChange={inputsHandler}
                                    required
                                    autoComplete="new-password"
                                />
                                <label className="input-label" htmlFor="password">Password</label>
                                <div className="eye-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            <div className="input-container mb-3">
                                <select
                                    className="input-text"
                                    id="role"
                                    name="role"
                                    placeholder=" "
                                    value={signupForm.role}
                                    onChange={inputsHandler}
                                    required
                                >
                                    <option value="" disabled selected>Select role</option> {/* empty placeholder */}
                                    <option value="1">Admin</option>
                                    <option value="2">User</option>
                                </select>
                            </div>

                            <div className='text-center pt-2'>
                                {successMessage && <p className='text-success'>{successMessage}</p>}
                                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                            </div>

                        </div>
                        <div className="card-footer border-0 text-center mb-auto px-0 py-0">

                            <button type='submit' className='btn btn-info signinBtn'>Signup</button>

                            <p className="text-center my-0 small pt-2">Click here to <span className='text-primary' onClick={onBack}> Login</span> if you have already account.</p>

                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}

export default Register;
