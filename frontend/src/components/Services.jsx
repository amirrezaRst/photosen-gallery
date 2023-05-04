import React from 'react';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Services = () => {
    return (
        <div class="site-section mt-0 py-2" data-aos="fade">
            <div class="container-fluid">

                <Helmet>
                    <title>Photosen - We Services</title>
                </Helmet>

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-5">
                            <div class="col-12 ">
                                <h1 class="site-section-heading text-center">Services</h1>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-camera display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Camera</h3>
                                <p>Photography services in all regions with the best cameras.</p>
                                <p><strong class="font-weight-bold text-primary">$29</strong></p>
                            </Link>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-picture display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Wedding Photography</h3>
                                <p>Couple and family photography in the studio or at home with the best price.</p>
                                <p><strong class="font-weight-bold text-primary">$46</strong></p>
                            </Link>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-sheep display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Animal</h3>
                                <p>Photography of pets etc. in nature or studio with the best ideas and photographers.</p>
                                <p><strong class="font-weight-bold text-primary">$24</strong></p>
                            </Link>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-frame display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Portrait</h3>
                                <p>Portrait and personal photography with the most appropriate price and services and photography in the studio and outdoor environment.</p>
                                <p><strong class="font-weight-bold text-primary">$40</strong></p>
                            </Link>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-eiffel-tower display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Travel</h3>
                                <p>Travel photography, record your best memories with us, with the best quality and cost.</p>
                                <p><strong class="font-weight-bold text-primary">$35</strong></p>
                            </Link>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 text-center mb-5 mb-lg-5">
                        <div class="h-100 p-4 p-lg-5 site-block-feature-7">
                            <Link to="/contact">
                                <span class="icon flaticon-video-play display-3 text-primary mb-4 d-block"></span>
                                <h3 class="text-white h4">Video Editing</h3>
                                <p>Edit video and photos in the shortest possible time and cooperate with companies and video creators.</p>
                                <p><strong class="font-weight-bold text-primary">$15</strong></p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Services;