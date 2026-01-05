import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function Layout({ children }) {
    const [showArrow, setShowArrow] = useState(false);
    const [loading, setLoading] = useState(true);
    const headerStyle = {
        top: 0,
        position: 'sticky',
        zIndex: 2,
    }
    const navigate = useNavigate();
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
                // localStorage.removeItem('loginForm');
                setTimeout(() => {
                    navigate('/'); // Redirect to login after showing alert
                }, 2000); // Delay the redirect to allow the alert to be seen
            } else {
                // Handle other errors if needed
                window.alert('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Ensure loader is hidden after validation
        }

    }, [navigate]);



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setShowArrow(true);
            } else {
                setShowArrow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);


    }, []);

    useEffect(() => {
        checkTokenValidity();
    }, [checkTokenValidity]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (loading) {
        return (
            <div className="loader d-flex align-items-center justify-content-center min-vh-100">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={headerStyle}>
                <Header />
            </div>
            <main className='min-vh-78'>
                {showArrow && (
                    <div className='upArrow' onClick={scrollToTop} style={{ position: 'fixed', bottom: '50px', right: '20px', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faArrowUp} flip />
                    </div>
                )}
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
