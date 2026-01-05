import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
function Footer() {
    // const footerDiv ={
    //   height: '5rem',
    //   background: "black",
    //   color: "#ffffff",
    //   position: 'relative',
    //   display: 'flex',
    //   alignItem: 'center',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }
    return (
        <>
            {/* <div style={footerDiv}>
        <p className='mb-0'>Powered By <a href="/#" >iTWINE Technologies Pvt Ltd</a></p>
      </div> */}

            <footer className="footer-section">
                <div className="container">

                    <div className="footer-content pt-5 pb-3">
                        <div className="row mx-0">
                            <div className="col-xl-3 col-lg-3 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a href="index.html"><img src="../../images/logo3.png" className="img-fluid" alt="logo" style={{ filter: 'invert(1)' }} /></a>
                                    </div>
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                        <a href="/#"><img src="../../images/facebook.png" alt="" width={30} /></a>
                                        <a href="/#"><img src="../../images/twitter.png" alt="" width={30} /></a>
                                        <a href="/#"><img src="../../images/google.png" alt="" width={30} /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 mb-30">
                                <div className="footer-widget">
                                    <div className="underline-animate">
                                        <h3 className='text-danger'>Useful Links</h3>
                                    </div>
                                    <ul className='ps-0'>
                                        <li><a className='underline-animate' href="/#">Home</a></li>
                                        <li><a className='underline-animate' href="/#">About us</a></li>
                                        <li><a className='underline-animate' href="/#">Services</a></li>
                                        <li><a className='underline-animate' href="/#">Contact us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 mb-50">
                                <div className="footer-widget">
                                    <div className="underline-animate">
                                        <h3 className='text-danger'>Company</h3>
                                    </div>
                                    <ul className='ps-0'>
                                        <li><a className='underline-animate' href="/#">Privacy Policies</a></li>
                                        <li><a className='underline-animate' href="/#">Terms</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 mb-50">
                                <div className="footer-widget">
                                    <div className="underline-animate">
                                        <h3 className='text-danger'>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div className="subscribe-form">
                                        <form >
                                            <input type="text" placeholder="Email Address" />
                                            <button><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container">
                        <div className="">
                            <div className="text-center ">
                                <div className="copyright-text">
                                    <p>Copyright © 2024, All Right Reserved <a className='underline-animate' href="https://itwinetech.com"> Vijay Mane</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
