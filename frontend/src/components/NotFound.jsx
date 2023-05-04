import React from 'react';
import { Link } from 'react-router-dom';



const NotFound = () => {
    return (
        <main style={{ width: "100%", height: "100vh", color: "rgb(190, 190, 190)",padding:"6vh 0" }} className="container text-center">

            <div className='text-center flex-lg-row flex-column d-flex align-items-center justify-content-center'>
                <p style={{ fontSize: "10rem", fontWeight: "600" }} className="mr-5">404</p>
                <div className='text-md-left text-center notfound'>
                    <p style={{ fontSize: "2rem", fontWeight: "600" }}>SORRY!</p>
                    <p style={{ fontSize: "2rem" }}>The page you’re looking for was not found.</p>
                </div>
            </div>
            <div className='mt-4'>
                <Link to="/" style={{ color: "rgb(190, 190, 190)",fontSize:"1.2rem" }}>Back to home</Link>
            </div>
            <div className='mt-5'>
                <span>Copyright © 2023 All rights reserved.</span>
            </div>

        </main>
    );
}

export default NotFound;