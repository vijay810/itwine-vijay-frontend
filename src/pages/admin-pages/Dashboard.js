import React from 'react';
import Layout from "../../components/AdminLayouts/Layout";


function Dashboard() {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
    };
    const borderStyle = {
        color: 'red',
    };

    return (
        <Layout>
            <>
                {/* <div>
                    <h5>Dashboard works here</h5>
                </div> */}
                <div style={containerStyle}>
                    <div className='text-center'>
                        <h3 style={{ fontSize: "-webkit-xxx-large", fontFamily: "serif", ...borderStyle }}>Welcome to iTWINE</h3>
                    </div>
                    <p></p>

                </div>
                <div className="nav-menu">
                    <div className="menu-item">
                        <p className="icon py-1 my-0 px-2">icon</p>
                        <p className="text py-1 my-0 px-2">hi pillu 1 hi pillu  hi pillu  hi pillu </p>
                    </div>
                    <div className="menu-item">
                        <p className="icon py-1 my-0 px-2">icon</p>
                        <p className="text py-1 my-0 px-2">hi pillu 2</p>
                    </div>
                    <div className="menu-item">
                        <p className="icon py-1 my-0 px-2">icon</p>
                        <p className="text py-1 my-0 px-2">hi pillu 3</p>
                    </div>
                </div>

            </>
        </Layout>
    );
}

export default Dashboard;
