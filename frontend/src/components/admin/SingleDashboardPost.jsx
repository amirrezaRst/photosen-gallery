import React from 'react';

import config from '../../services/config.json';


const SingleDashboardPost = ({ image, profile, fullName, subtitle, id, like }) => {
    return (
        <div className="col-12 col-md-4">
            <div class="card profile-card-2">
                <div class="card-img-block">
                    <img src={`${config.localDomain}/${image}`} class="img-fluid single-profile-card" alt="Card image cap" />
                </div>
                <div class="card-body pt-5 text-center text-white">
                    <img src={`${config.localDomain}/${profile}`} alt="profile-image" class="profile" style={{ filter: "none" }} />
                    <h5 class="card-title">{fullName}</h5>
                    <p class="card-text text-left text-justify">{subtitle}</p>
                    <div className="text-left d-flex align-items-center justify-content-between">
                        <div>
                            <i className="fa fa-heart text-danger mr-2"></i>
                            <span style={{ fontSize: "1.2rem" }}>{like}</span>
                        </div>
                        <div className='mt-3'>
                            <i class="fa-solid fa-trash-xmark text-danger" style={{fontSize:"1.3rem"}}></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SingleDashboardPost;