import React from 'react'
import Layout from "../../components/UserLayouts/Layout";
const Service = () => {

    return (
        <>
            <Layout>
                <div className='py-2 text-center'>
                    <p className="h4">Our Services</p>
                    <img src="../../images/newLayer/layer.png" alt="layer" height="50" width="100%" />
                    <small>Core Offering from iTWINE</small>
                </div>
                <div className="container-width">
                    <div className="row mx-0">
                        <div className='col-sm-6'>
                            <div className=''>
                                <div className='seriveimage d-flex align-items-center'>
                                    <img src="../../images/scm.webp" alt="logo-image" />
                                    <p className='fw-bold font22 mb-0 py-2 px-2'>SCM Solutions Advisory</p>
                                   
                                </div>
                                <small>Logistics, Distribution & Transportation
                                    Third Party Logistics
                                    IT strategy consultation
                                    Scheduling and Optimization Needs</small>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className=''>
                                <div className='seriveimage d-flex align-items-center'>
                                    <img src="../../images/remote.webp" alt="logo-image" />
                                    <p className='fw-bold font22 mb-0 py-2 px-2'>Remote Software Development</p>
                                </div>
                                <small>Having handled several large, resource intensive software projects, iTWINE can take up assignments to be executed at its own development center away from client locations. Working as an extension of your core IT group, iTWINE can help you right from formulating your long-term IT policy and planning for your IT initiatives to</small>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className=''>
                                <div className='seriveimage d-flex align-items-center'>
                                    <img src="../../images/reengin.webp" alt="logo-image" />
                                    <p className='fw-bold font22 mb-0 py-2 px-2'>Re-engineering & Integration</p>
                                </div>
                                <small>Migration studies and implementation - Web enabling legacy applications - Interfacing of open systems with legacy applications iTWINE's team can undertake System Integration assignments involving both legacy and open systems. Study of present system / applications and its base-lining are followed by creation of</small>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className=''>
                                <div className='seriveimage d-flex align-items-center'>
                                    <img src="../../images/prefab.webp" alt="logo-image" />
                                    <p className='fw-bold font22 mb-0 py-2 px-2'>Prefab Components for Business Functions Custom-made solutions delivered fast!</p>
                                </div>
                                <small>Unlike a products company or a general IT solutions services provider, iTWINE provides IT solutions using its pre-fabricated software components for standard business functions, in building the software</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Service
