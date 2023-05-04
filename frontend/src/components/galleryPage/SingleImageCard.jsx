import React from 'react';
import { Link } from 'react-router-dom';
import config from "../../services/config.json";

import Banner1 from "./nature_small_3.jpg";


const SingleImageCard = ({ id, image, path }) => {
    const urlAddress = `/picture/${id}`
    const imageUrl = `${config.localDomain}/${image}`

    return (
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 item" data-aos="fade" data-src="images/big-images/nature_big_1.jpg" data-sub-html="<h4>Fading Light</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque hic excepturi fugit, sunt impedit fuga tempora, ad amet aliquid?</p>">
            <Link to={urlAddress}><img src={imageUrl} alt="IMage" class={path == "profile" ? "img-fluid single-profile-card" : "img-fluid"} /></Link>
        </div>
    );
}

export default SingleImageCard;