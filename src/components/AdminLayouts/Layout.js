// import React from 'react'
// import Footer from './Footer';
// import Header from './Header';
// const Layout = (props) => {

//     return (
//         <>
//             <div>
//                 <Header />
//                 <main className='min-vh-78'>
//                     {props.children}
//                 </main>
//                 <Footer />
//             </div>
//         </>
//     )
// }

// export default Layout;

import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';

function Layout({ children }) {
    const navigate = useNavigate();

    // Memoize the checkTokenValidity function
    const checkTokenValidity = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const apiUrl = `${process.env.REACT_APP_API}/auth/verify-token`;
            await axios.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            if (error.response?.status === 401) {
                // Token is expired or invalid
                window.alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                localStorage.removeItem('loginForm');
                setTimeout(() => {
                    navigate('/'); // Redirect to login after showing alert
                }, 2000); // Delay the redirect to allow the alert to be seen
            } else {
                // Handle other errors if needed
                window.alert('An error occurred. Please try again.');
            }
        }
    }, [navigate]);

    // Run token validation check on component mount
    useEffect(() => {
        checkTokenValidity();
    }, [checkTokenValidity]);

    return (
        <>
            <div>
                <Header />
                <main className='min-vh-78'>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
