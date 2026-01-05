import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Register() {
    const clearForm = {
        name: "",
        email: "",
        mob: "",
        password: "",
        role: "",
        status:'1'
    };

    const [signupForm, setSignupForm] = useState(clearForm);
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 1000);
        } catch (error) {
            setErrorMessage(error.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='card signIn'>
                <p className='fw-bold h1 text-center py-2'>Sign Up</p>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={signupForm.name}
                                onChange={inputsHandler}
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={signupForm.email}
                                onChange={inputsHandler}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="mob"
                                name="mob"
                                placeholder="Enter your mobile number"
                                value={signupForm.mob}
                                onChange={inputsHandler}
                                required
                                autoComplete="tel"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={signupForm.password}
                                    onChange={inputsHandler}
                                    required
                                    autoComplete="new-password"
                                />
                                <span className="input-group-text" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <select
                                className="form-control"
                                id="role"
                                name="role"
                                value={signupForm.role}
                                onChange={inputsHandler}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </select>
                        </div>
                        <div className='text-center pt-2'>
                            {successMessage && <p className='text-success'>{successMessage}</p>}
                            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                        </div>
                        <div className='mt-3 text-center mb-auto'>
                            <button type='submit' className='btn btn-info signinBtn'>Signup</button>
                        </div>
                        <div className=''>
                            <p className="text-center my-0 small py-0">Click here to <Link to='/'>login</Link> if you have already account.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
