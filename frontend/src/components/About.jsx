import React from 'react';

import { Helmet } from 'react-helmet';


const About = () => {
    return (
        <div class="site-section py-3" data-aos="fade">
            {/* <h2 class="site-section-heading text-center mb-5">About</h2> */}

            <Helmet>
                <title>Photosen - About us</title>
            </Helmet>

            <div class="container-fluid">

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-5">
                            <div class="col-12 ">
                                <h2 class="site-section-heading text-center">About</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row mb-5">
                    <div class="col-md-7">
                        <img src="images/img_2.jpg" alt="Images" class="img-fluid" />
                    </div>
                    <div class="col-md-4 ml-auto">
                        <h3 class="text-white">We Mission</h3>
                        <p style={{ fontSize: "1.3rem" }}>We at Fotosen try to share good photos along with graphic and photography services and provide this platform so that you can share your amazing photos with others and record our good and pleasant memories together.</p>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default About;