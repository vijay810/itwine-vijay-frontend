import React from 'react'
import Layout from '../../components/UserLayouts/Layout'

const ItwineAdvantages = () => {
   
    return (
        <>
            <Layout>

                <div>
                    <div className='text-center py-2'>
                        <p className='fw-bold h4 pt-2 mb-0'>Advantages</p>
                        <img src="../../images/newLayer/layer.png" alt="layer" height="50" width="100%" />
                    </div>

                    <div className='container py-2' style={{ maxWidth: '1100px' }}>
                        <div className="accordion accordion-flush" id="accordionFlushExample" style={{ position: 'sticky' }}>
                            <div className="accordion-item rounded border">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        The  <span className='itext ps-1'>i</span><span className='twine pe-1'>TWINE</span>  Strengths
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body"><p className='small mb-0'><span className='itext'>i</span><span className='twine'>TWINE's</span> value proposition for Off-Shore development is based on the edifice of four major strengths.</p></div>
                                </div>
                            </div>
                            <div className="accordion-item rounded border">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        System Engineering Approach
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p className='small mb-0'><span className='itext'>i</span><span className='twine'>TWINE</span> is well armed with a team of architects and associates that follow well-established principles of system engineering while looking at any problem.Multiple options are discussed, evaluated and thrashed out to ensure that an optimal solution emerges.Though these high-end consulting services from <span className='itext'>i</span><span className='twine'>TWINE</span> are at par with other industry stalwarts, they come to <span className='itext'>i</span><span className='twine'>TWINE's</span> clients at a significantly lower cost. <span className='itext'>i</span><span className='twine'>TWINE</span> proprietary tool and methodology, Showcase, helps gather business process requirements and transform them into specifications for the subsequent phase of implementation.</p></div>
                                </div>
                            </div>
                            <div className="accordion-item rounded border">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Prefab Componentss
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p className='small mb-0'>
                                        <span className='itext'>i</span><span className='twine'>TWINE</span> has invested upfront in several software components addressing common business needs. It has also components for supporting the technology framework deployed in all the software systems it develops. This approach enables <span className='itext'>i</span><span className='twine'>TWINE</span> to delivers its solutions faster to the customers with proven quality and all within budgetary constraints. <br />
                                        <span className='itext'>i</span><span className='twine'>TWINE's</span> solutions demand least total cost of ownership, when compared to product companies or pure-play service companies, Customers pay for only those software components they need. Along with the custom-made software components developed for them specially, the customers get the total solution is sooner and less expensive..
                                        </p>
                                        </div>
                                
                                </div>
                            </div>
                            <div className="accordion-item rounded border">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                        Design and Implementation of IT Solutions
                                    </button>
                                </h2>
                                <div id="collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p className='small mb-0'><span className='itext'>i</span><span className='twine'>TWINE's</span> strengths in the technologies for software engineering and project management make it a strong choice for designing and implementing IT solutions for wide ranging needs. The technology knowledge spans two broad classes of J2EE and .NET spectra. Making use of several tools and associated methodologies, <span className='itext'>i</span><span className='twine'>TWINE</span> supports the entire development cycle. This results in high-quality work-products at a considerably low investment.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item rounded border">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                        Development Methodology
                                    </button>
                                </h2>
                                <div id="collapsefive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p className='mb-0 py-1 small mb-0'><span className='itext'>i</span><span className='twine'>TWINE</span> is a process-oriented organization that is continually on the lookout for improving productivity and reducing non-conformance in work-products. In addition to third-party products, several tools and utilities, many of them developed in-house, guide <span className='itext'>i</span><span className='twine'>TWINE's</span>  design engineers and programmers through all the phases of Software Development.</p>
                                        <p className='mb-0 py-1 small mb-0'>This methodology leads to many benefits:</p>
                                        <ul className='small mb-0'>
                                            <li> Well-defined user requirements</li>
                                            <li> Simplified design steps</li>
                                            <li> Minimal programming effort</li>
                                            <li> Adherence to expected functionality</li>
                                            <li> People-independent development</li>
                                            <li> Overall increased productivity at reduced cost and time</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    )
}

export default ItwineAdvantages
