import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import { NavLink, Link, useNavigate } from "react-router-dom";
import { userContext } from '../../services/userContext';

const Navbar = () => {

    const context = useContext(userContext)
    // const profileAddress = `/profile/${context.userData._id}`
    const navigation = useNavigate();

    const result = () => {
        // console.log(profileAddress);
        console.log(context.userLogin);
        // console.log(localStorage.getItem("userId"));
    }

    const redirectProfile = () => {
        var profileAddress;
        if (context.userData) {
            return profileAddress = `/profile/${context.userData._id}`
        }
        else profileAddress = `/login`
        navigation(profileAddress)
    }

    return (
        <header class="site-navbar py-3 mb-4" role="banner">

            <div class="container-fluid">
                <div class="row align-items-center">

                    <div class="col-6 col-xl-2" data-aos="fade-down">
                        <h1 class="mb-0"><Link to="/" class="text-white h2 mb-0" style={{ textDecoration: "none" }}>Photosen</Link></h1>
                    </div>
                    <div class="col-10 col-md-8 d-none d-xl-block" data-aos="fade-down">
                        <nav class="site-navigation position-relative text-right text-lg-center" role="navigation">

                            <ul class="site-menu js-clone-nav mx-auto d-none d-lg-block">
                                <li><NavLink exact to="/" className={(navData) => (navData.isActive ? 'nav-active' : '')}>Home</NavLink></li>
                                <li class="has-children">
                                    <NavLink to="/Gallery/" className={(navData) => (navData.isActive ? 'nav-active' : '')}>Gallery</NavLink>
                                    <ul class="dropdown">
                                        <li><NavLink to="/gallery/nature">Nature</NavLink></li>
                                        <li><NavLink to="/gallery/portrait">Portrait</NavLink></li>
                                        <li><NavLink to="/gallery/people">People</NavLink></li>
                                        <li><NavLink to="/gallery/architecture">Architecture</NavLink></li>
                                        <li><NavLink to="/gallery/animals">Animals</NavLink></li>
                                        <li><NavLink to="/gallery/sports">Sports</NavLink></li>
                                        <li><NavLink to="/gallery/travel">Travel</NavLink></li>
                                        <li><NavLink to="/gallery/galaxy">Galaxy</NavLink></li>
                                    </ul>
                                </li>
                                <li><NavLink to="/services" className={(navData) => (navData.isActive ? 'nav-active' : '')}>Services</NavLink></li>
                                <li><NavLink to="/about" className={(navData) => (navData.isActive ? 'nav-active' : '')}>About</NavLink></li>
                                <li><NavLink to="/contact" className={(navData) => (navData.isActive ? 'nav-active' : '')}>Contact</NavLink></li>
                                {/* <li><button className="btn btn-light" onClick={result}>Result</button></li> */}
                            </ul>
                        </nav>
                    </div>

                    <div class="col-6 col-xl-2 text-right" data-aos="fade-down">
                        <div className="d-xl-block d-none">
                            <div className="d-flex justify-content-end mr-4 align-items-center register-button-group">

                                {context.userLogin ?
                                    <div className="">
                                        <NavLink to="/new-post" ><i class="fa-solid fa-rectangle-history-circle-plus"></i></NavLink>
                                        {context.userData.role && context.userData.role == "admin" ?
                                            <NavLink to={context.userData ? `/profile/${context.userData._id}` : `/login`}><i class="fa-solid fa-user-shield"></i></NavLink> :
                                            <NavLink to={context.userData ? `/profile/${context.userData._id}` : `/login`}><i class="fa-solid fa-user"></i></NavLink>
                                            // <span onClick={redirectProfile}><i class="fa-solid fa-user-shield"></i></span> :
                                            // <span onClick={redirectProfile}><i class="fa-solid fa-user"></i></span>
                                        }
                                    </div> :
                                    <div className="">
                                        <NavLink to="/login"><p className="btn register-btn">Login</p></NavLink>
                                        <NavLink to="/signup"><p className="btn register-btn">SignUp</p></NavLink>
                                    </div>
                                }

                            </div>
                        </div>

                        <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{ position: " relative", top: " 3px" }}><a href="#"
                            class="site-menu-toggle js-menu-toggle text-black"><span class="icon-menu h3"></span></a></div>

                    </div>

                </div>
            </div>

        </header>
    );
}

export default Navbar;