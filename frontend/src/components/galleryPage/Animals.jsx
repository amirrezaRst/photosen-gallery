import React from 'react';

import { Helmet } from 'react-helmet';

import SingleImageCard from './SingleImageCard';


const Animals = ({ pictures }) => {
    return (
        <div class="site-section py-2" data-aos="fade">
            <div class="container-fluid">

                <Helmet>
                    <title>Photosen - Animals Gallery</title>
                </Helmet>

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-5">
                            <div class="col-12 ">
                                <h2 class="site-section-heading text-center">Animals Gallery</h2>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row" id="lightgallery">

                    {pictures.length > 0 ? pictures.map(item => <SingleImageCard id={item._id} image={item.picAddress} />) : <div className='container text-center' style={{ padding: "20vh 0" }}><h4>There are no image</h4></div>}

                </div>
            </div>
        </div>
    );
}

export default Animals;