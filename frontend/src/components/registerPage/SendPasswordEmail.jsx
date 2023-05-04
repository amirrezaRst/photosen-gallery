import React, { useEffect } from 'react';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';


const SendPasswordEmail = () => {

    const params = useLocation();


    return (
        <div class="site-section" data-aos="fade">
            <div class="container">
                ``
                <Helmet>
                    <title>Photosen - Forgot Password</title>
                </Helmet>

                <main className="container" style={{ height: "90vh" }}>
                    <h1 className='text-white text-center mb-4'>Email sent</h1>
                    <div>
                        {/* <p className='text-center' style={{ color: "rgb(190,190,190)" }}>The email was sent to amirreza.rostami.0073@gmail.com</p> */}
                        <p className='text-center mx-auto' style={{ color: "rgb(190,190,190)", fontSize: "1.2rem", width: "60%" }}>Authentication and password change email was sent to <span style={{ color: "rgb(240,240,240)" }}>amirreza.rostami.0073@gmail.com</span></p>
                        {/* <p className='text-center' style={{color:"#1ba87e",fontSize:"1.04rem"}}>Back to login</p> */}
                        <Link to="/login" className='d-block text-center'>Back to login</Link>
                        <button class="btn btn-primary py-2 px-4 text-black d-block mx-auto mt-5">Resend</button>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default SendPasswordEmail;