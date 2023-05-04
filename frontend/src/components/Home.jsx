import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { userContext } from '../services/userContext';



const Home = () => {

    const context = useContext(userContext);

    const result = () => {
        localStorage.getItem("token");
        localStorage.getItem("userId");
        console.log(context.userLogin);
        console.log(context.userData);
    }
    return (
        <div class="site-wrap">

            <Helmet>
                <title>Photosen - Home</title>
            </Helmet>

            <div class="site-mobile-menu">
                <div class="site-mobile-menu-header">
                    <div class="site-mobile-menu-close mt-3">
                        <span class="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div class="site-mobile-menu-body"></div>
            </div>

            <div class="container-fluid" data-aos="fade" data-aos-delay="500">
                <div class="row">

                    <div class="col-lg-4">
                        <Link to="/gallery/nature">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Nature</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/nature_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/portrait">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Portrait</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/img_6.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/animals">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Animals</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/animal_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/travel">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Travel</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/travel_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/architecture">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Architecture</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/architecture_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/people">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">People</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/people_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/galaxy">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Galaxy</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/galaxy_1.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4">
                        <Link to="/gallery/sport">
                            <div class="image-wrap-2">
                                <div class="image-info">
                                    <h2 class="mb-3">Sport</h2>
                                    <p class="btn-outline-white py-2 px-4">More Photos</p>
                                </div>
                                <img src="images/sport_image.jpg" alt="Image" class="img-fluid" />
                            </div>
                        </Link>
                    </div>

                </div>
                {/* <button className="btn btn-light" onClick={result}>Result</button> */}
            </div>
        </div>
    );
}

export default Home;