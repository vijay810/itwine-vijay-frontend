import React, { useState, useEffect } from 'react'
import Layout from "../../components/UserLayouts/Layout";
// import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import 'animate.css';
import '../../styles/custom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import axios from '../../../src/api/axios';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserDashboard() {
    const [name, setName] = useState('');
    const [clientsData, setClientsData] = useState([]);
    const [newsData, setNewsData] = useState([])

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '70vh',
        fontFamily: '"PT Serif", serif',
        fontWeight: 700,
        fontStyle: 'italic',
    };


    // const headerStyle = {
    //   top: 60,
    //   position: 'sticky',
    //   background: 'aliceblue',
    // }
    const card = {
        position: 'static'
    }

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            const firstWord = storedName.split(' ')[0];
            setName(firstWord);
            console.log(firstWord)
        }
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    };

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/clients/`)
            .then((res) => {
                setClientsData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const getNews = () => {
        axios
            .get(`${process.env.REACT_APP_API}/news/get-active-data/`)
            .then((res) => {
                setNewsData(res.data.data);
                console.log('Response Data:', res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
        getNews();
    }, []);


    return (
        <Layout>

            <div className='dashboardBanner'>
                <div className='bg-white'>
                    <div className='marquee-container pt-1'>
                        {newsData.length > 0 ? (
                            <div className='marquee-content'>
                                {newsData.map((offer, index) => (
                                    <div key={index} className='marquee-item'>
                                        <p className='mb-0 small pe-2'>{formatDate(offer.date)}</p>
                                        <p className='mb-0 small text-primary'>{offer.news}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No News found</p>
                        )}
                    </div>


                    <div id="homeDivFirst" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval={10000}>
                        <div className="carousel-inner ">
                            <div className="carousel-item active" >
                                <div className=''>
                                    <div className='row mx-0'>
                                        <div className="col-sm-4 px-3 col-12 pt-4">
                                            <div className='card profileImage ' style={card}>
                                                <img className='animate__animated animate__bounce' src="../../images/employee.png" alt="" />
                                            </div>
                                        </div>
                                        <div className='col-sm-8 text-center col-12' style={containerStyle}>
                                            <p className='main-heading animate__animated animate__fadeInRight animate__delay-1s' style={{ filter: "drop-shadow(grey 4px 6px 2px)" }}>Welcome <span className='text-danger animate__animated animate__jackInTheBox animate__delay-2s'>{name}...</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <div className="carousel-item">
                                <div className='row mx-0'>
                                    <div className='col-sm-6'>
                                        <div className="d-flex align-items-center justify-content-center pt-2" style={{}}>
                                            <img className="animate__animated animate__fadeInLeftBig pcImg1" src="../../images/phone.png" alt="img1" />
                                            <img className="animate__animated animate__zoomInDown animate__delay-1s pcImg2" src="../../images/mac1.webp" alt="img2" />
                                            <img className="animate__animated animate__lightSpeedInRight animate__delay-2s pcImg3" src="../../images/tab.png" alt="img3" />
                                        </div>
                                    </div>
                                    <div className='col-sm-6 d-flex align-items-center'>
                                        {/* <div className="carousel-caption  d-md-block"> */}
                                        <div className=''>
                                            <p className='animate__animated animate__bounceInDown fw-bold h3 main-head'>Responsive Website</p>
                                            <p className='animate__animated animate__bounceIn animate__delay-1s paragraph' syele={{ color: '#05238e' }}>We create beautiful designs across desktops, smart phones, and tablets; Responsive Design is the future of modern website design.</p>
                                        </div>

                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row mx-0'>
                                    <div className='col-sm-6 justify-content-center'>
                                        <div className="p-2 pt-4">
                                            <img className='carouselImg animate__animated animate__zoomIn rounded-5 animate__delay-1s' src="../../images/team/resourseFinite.gif" width='100%' alt="" />
                                        </div>
                                    </div>
                                    <div className='col-sm-6 d-flex align-items-center'>
                                        <div>
                                            <p className='animate__animated animate__bounceInDown fw-bold h3 mb-0 main-head'><span className='text-danger'>i</span>TWINE  Technologies.. </p>
                                            <p className='animate__animated animate__bounceInDown fw-bold h3 main-head'> Because Resources are finite!</p>
                                            <pre></pre>
                                            <p className='animate__animated animate__fadeInRightBig animate__delay-1s paragraph' syele={{ color: '#05238e' }}>IF EVER A SINGLE WORD WERE TO EPITOMIZE THE BUSINESS PHILOSOPHY WITH WHICH ITWINE EMBARKED ON ITS JOURNEY INTO THE IT WORLD... THIS WAS IT!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row mx-0'>
                                    <div className='col-sm-6 justify-content-center'>
                                        <div className='p-2 pt-4'>
                                            <img className='carouselImg animate__animated animate__zoomIn rounded-5 animate__delay-1s' src="../../images/img2.jpeg" alt="" width="100%" />
                                        </div>
                                    </div>
                                    <div className='col-sm-6 d-flex align-items-center'>
                                        <div>
                                            <p className='animate__animated animate__bounceInUp fw-bold h3 main-head'>Re-engineering & Integration</p>
                                            <p className="paragraph animate__animated animate__lightSpeedInRight animate__delay-1s" > <span className='text-danger'>i</span>TWINE's team can undertake System Integration assignments involving both legacy and open systems.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="../../images/team/handshake.png" className="d-block w-100 bestofluck" alt="..." />
                                <div className="carousel-caption  d-md-block">
                                    <h5 className='animate__animated animate__bounceInUp fw-bold text-warning h2 main-head'>Best of luck</h5>
                                    <p className='animate__animated animate__fadeInLeftBig animate__delay-1s text-white fw-bold paragraph'>“Best of luck with your great future at the IT company.”</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" style={{ height: 'fit-content', top: '40%' }} type="button" data-bs-target="#homeDivFirst" data-bs-slide="prev">

                            <span className="carousel-control-prev-icon prev-icon"><FontAwesomeIcon icon={faAnglesLeft} style={{ height: 'auto' }} /></span>
                        </button>
                        <button className="carousel-control-next" style={{ height: 'fit-content', top: '40%' }} type="button" data-bs-target="#homeDivFirst" data-bs-slide="next">
                            <span className="carousel-control-next-icon next-icon"><FontAwesomeIcon icon={faAnglesRight} style={{ height: 'auto' }} /></span>
                        </button>
                    </div>
                </div>


                <div className='p-1 bg-white'>
                    <div className='text-center py-2'>
                        <img src="../../images/newLayer/layer.png" alt="layer" height="50" width="100%" style={{ filter: 'drop-shadow(3px 6px 4px black)' }} />
                        {/* <p className='py-2 my-0 fw-bold h3 headingContent'>About us</p> */}
                    </div>
                    <div className='row mx-0'>
                        <div className='col-sm-8'>
                            <div className='card' style={card}>
                                <p className='py-2 my-0 fw-bold h3 headingContent text-center'>Information</p>
                                <div className='card-body about'>
                                    <p>Itwine Technologies Private Limited is a Private incorporated on 27 November 2000. It is classified as Non-government company and is registered at Registrar of Companies, ROC Bangalore. Its authorized share capital is Rs. 27,500,000 and its paid up capital is Rs. 11,501,970. It is inolved in AIR TRANSPORT</p>

                                    <p>Itwine Technologies Private Limited's Annual General Meeting (AGM) was last held on N/A and as per records from Ministry of Corporate Affairs (MCA), its balance sheet was last filed on 31 March 2023.</p>

                                    <p>Directors of Itwine Technologies Private Limited are Shivapooja Gopalasetty Sureshbabu and Namitha Suresh.</p>

                                    <p>Itwine Technologies Private Limited's Corporate Identification Number is (CIN) U62099KA2000PTC028196 and its registration number is 28196.Its Email address is sgsureshbabu@itwinetech.com and its registered address is SUITE #105, CASANDREE 8,ANDREE ROAD, BANGALORE , BANGALORE, Karnataka, India - 560027.</p>

                                    <p>Current status of Itwine Technologies Private Limited is - Active.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4 d-flex align-items-center justify-content-center'>

                            <div className='card about-card' style={card}>
                                <img src="../../images/employee.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white'>
                    <div className='row mx-0 justify-content-center'>
                        <div className="col-sm-4 text-center py-2">
                            <div className='owner'>
                                <img className="owner-profile-img" src="../images/employee.jpeg" alt='a' />
                                <div className="owner-description-bk" />
                                <div className="owner-logo d-flex align-items-center justify-content-center">

                                    <p className='mb-0 fw-bold h3 text-dark'>CEO</p>
                                    {/* <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291375.3948_Dy2yZu_n.jpg" alt='b' /> */}
                                </div>
                                <div className="owner-description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                                <div className="owner-date">
                                    <p>8.08.2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center py-2">
                            <div className='owner'>
                                <img className="owner-profile-img" src="../images/employee.png" alt='c' />
                                <div className="owner-description-bk" />
                                <div className="owner-logo d-flex align-items-center justify-content-center">
                                    <p className='mb-0 fw-bold h3 text-dark'>HR</p>
                                    {/* <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291375.3948_Dy2yZu_n.jpg" alt='d' /> */}
                                </div>
                                <div className="owner-description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                                <div className="owner-date">
                                    <p>8.08.2024</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='bg-white py-3'>
                    <p className='text-center fw-bold h3 headingContent'>WHY <span className='itext'>i</span>TWINE</p>
                    <div className='row mx-0'>
                        <div className='col-sm-6 text-center'>
                            <div className='cleanCode py-3'>
                                <img src="../../images/cleanCode.jpg" alt="" width='100%' />
                            </div>
                        </div>
                        <div className='col-sm-6 whyitwine d-flex align-items-center'>
                            <div className=''>
                                <ul>
                                    <li>System Engineering Approach</li>
                                    <li>Prefab Components</li>
                                    <li>Design and Implementation of IT Solutions</li>
                                    <li>Development Methodology</li>
                                    <li>Unique Designs</li>
                                    <li>Clean Codes</li>
                                    <li>Multiple Testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid px-0'>
                    <div className='py-0'>
                        <div className='clientmsg px-0 mx-0 pt-3'>
                            <p className='text-center h3 fw-bold text-danger headingContent'>WHAT OUR CLIENTS SAY</p>
                            <div className='container ' style={{ maxWidth: '1020px' }}>
                                <div id="clientMsg" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators mb-0">
                                        <button type="button" data-bs-target="#clientMsg" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#clientMsg" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#clientMsg" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        <button type="button" data-bs-target="#clientMsg" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                        <button type="button" data-bs-target="#clientMsg" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                    </div>
                                    <div className="carousel-inner" style={{ minHeight: '200px' }}>
                                        <div className="carousel-item active">
                                            <p className='msg'>“Thanks to all for your continued co-operation on the project. We are getting to point of convergence realities and I think there are likely to be lots of e-mails like this that seem to change from ideas into reality. It looks like we have an excellent product and hopefully good data to share with MOH!"</p>
                                            <p className='msg'>“I just wanted to write a note of thanks to all your team for giving me opportunity to work with you. It has been a wonderful experience to interact with a lot of you through the very short-time period while I was working on testing the project. I wish to express my special gratefulness to all for helping me in many ways to make this happen, and for being there when needed."</p>
                                            <p className='msg'>“Things are in good shape and there are some talks going on, if this project is successful, there is going to be a roll out happening on country wide and the Procurement side module is also going to come up. This project is the talk of town at the moment. That is the reason we are taking so much pain. SCM is also going to be brought in shortly. "</p>
                                            <p className='client text-primary'>Project Director, Healthcare Logistics , Tanzania</p>
                                        </div>
                                        <div className="carousel-item">
                                            <p className='msg'>"In my professional career I carried out many projects on customer satisfaction and developed various questionnaires in order to better understand customers' requirements and develop a successful strategy. I must admit that I never used a PDA system and I would like to tell you that the system is practical and extremely effective."</p>
                                            <p className='client text-primary'>General Manager, Hospitality Sector , Quality in Action (QIA) - A quality system for hospitality sector</p>
                                        </div>
                                        <div className="carousel-item">
                                            <p className='msg'> Man you guys are very quick!!! I just wish our students were as vigilant as you were!!</p>
                                            <p className='client text-primary'> Marketing Manager, Australia, eLearning Portal for an Australian Academy for Hospitality Management</p>
                                        </div>
                                        <div className="carousel-item">
                                            <p className='msg'>It was like giving birth to a 700 pound baby. But we did it - great work every one!!!</p>
                                            <p className='client text-primary'> OPD Client, USA, Electronic Medical Record System Certification</p>
                                        </div>
                                        <div className="carousel-item">
                                            <p className='msg'> Dear Suresh. We really appreciate your dedication. Please convey a big thank you from us to your team. Ours has been a partnership based on understanding and tolerance. Long may it remain.My big thank you to you.</p>
                                            <p className='client text-primary'> Chief Executive Officer, Consulting Group of a University, Malaysia</p>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" style={{ opacity: '0' }} type="button" data-bs-target="#clientMsg" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" style={{ opacity: '0' }} type="button" data-bs-target="#clientMsg" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container py-2'>

                    {clientsData.length > 0 ? (
                        <Slider {...settings}>
                            {clientsData.map((client, index) => (
                                <div key={index} className='px-1'>
                                    <div className='card px-1 text-center'>
                                        <p className='mb-0'>{client.name}</p>
                                        <p className='mb-0 small text-primary'>{client.project}</p>
                                    </div>

                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>No clients found</p>
                    )}

                </div>
                <div className='container-fluid px-0 bg-white'>
                    <div className='px-2'>
                        <div className='text-center py-2'>
                            <p className='py-1 my-0 fw-bold h3 headingContent underline-animate'>Contact us</p>
                        </div>
                        <div className='row mx-0'>
                            <div className='col-sm-6'>
                                <div className="card text-center" style={card}>
                                    <iframe
                                        width="100%"
                                        height="450"
                                        src="https://www.youtube.com/embed/Cfi0mymfKiA"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="YouTube Video 2">
                                    </iframe>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1642!2d77.5937371!3d12.960146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15da75593349%3A0x61c3fef6a40b2cac!2s8%2C+Andree+Rd%2C+Akkithimana+Halli%2C+Bheemanna+Garden%2C+Shanti+Nagar%2C+Bengaluru%2C+Karnataka+560027%2C+India!5e0!3m2!1sen!2sus!4v1627662730402!5m2!1sen!2sus"
                                    width="100%"
                                    height="450"
                                    style={{ border: '0' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Map showing the location of our office">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-menu">
                    {/* <div className="menu-item">
                        <p className="icon py-1 my-0 px-2"><img src="../../images/whatsapp.png" alt="" width={30} /></p>
                        <p className="text py-1 my-0 px-2">hi pillu 1 hi pillu  hi pillu  hi pillu </p>
                    </div> */}
                    <div className="menu-item">
                        <p className="icon py-1 my-0 px-2"><img src="../../images/instagram.png" alt="" width={30} /></p>
                        <p className="text py-1 my-0 px-2 text-danger">Instagram</p>
                    </div>
                    <div className="menu-item">

                        <p className="icon py-1 my-0 px-2"><img src="../../images/linkedin.png" alt="" width={30} /></p>
                        <p className="text py-1 my-0 px-2 text-danger">Linkedin</p>
                    </div>
                </div>


            </div>


        </Layout>

    )
}

export default UserDashboard
