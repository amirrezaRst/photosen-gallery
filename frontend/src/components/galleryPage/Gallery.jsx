import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { Helmet } from 'react-helmet';

import SingleImageCard from './SingleImageCard';


const Nature = ({ pictures }) => {

    return (
        <div class="site-section py-2" data-aos="fade">
            <div class="container-fluid">

                <Helmet>
                    <title>Photosen - Gallery</title>
                </Helmet>

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-5">
                            <div class="col-12 ">
                                <h2 class="site-section-heading text-center">Gallery</h2>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row" id="lightgallery">

                    {pictures ? pictures.map(item => <SingleImageCard id={item._id} image={item.picAddress} />) : null}

                </div>
            </div>
        </div>
    );
}

export default Nature;