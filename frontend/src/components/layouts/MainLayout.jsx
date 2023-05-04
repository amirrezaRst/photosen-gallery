import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';


const MainLayout = ({ children }) => {
    const params = useLocation();
    return (


        <React.Fragment>

            {params.pathname == "/dashboard" ?
                null :
                <div>
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            }

        </React.Fragment>
    );
}

export default MainLayout;