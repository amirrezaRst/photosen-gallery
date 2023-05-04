import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../common/AdminSidebar';
import AdminTopNav from '../common/AdminTopNav';


const AdminLayout = ({ children }) => {
    return (
        <div class="container-scroller admin-content">

            <AdminSidebar />

            <div class="container-fluid page-body-wrapper">


                <nav class="navbar admin-navbar p-0 fixed-top d-flex flex-row">
                    <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                        <h1 className='mr-5 py-2'><Link to="/" className='text-white'>Photosen</Link> </h1>
                        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                            <i class="fa fa-bars" style={{ fontSize: "1.3rem" }}></i>
                        </button>

                        <AdminTopNav />
                        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <i class="fa fa-bars-staggered"></i>
                        </button>
                    </div>
                </nav>



                {children}

            </div>

        </div>
    );
}

export default AdminLayout;