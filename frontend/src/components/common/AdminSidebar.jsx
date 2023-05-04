import React, { useContext } from 'react';

import { userContext } from '../../services/userContext';
import config from "../../services/config.json";


const AdminSidebar = () => {

    const context = useContext(userContext);

    return (
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav">
                <li class="nav-item profile">
                    <div class="profile-desc" style={{ marginTop: "5vh" }}>
                        <div class="profile-pic">
                            <div class="count-indicator">
                                <img class="img-xs rounded-circle single-profile-card" src={`${config.localDomain}/${context.userData.profileImage}`} alt="" />
                                {/* <span class="count bg-success"></span> */}
                            </div>
                            <div class="profile-name">
                                <h5 class="mb-0 font-weight-normal text-white text-capitalize">{context.userData.fullName}</h5>
                                <span>User Admin</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item nav-category">
                    <span class="nav-link">Navigation</span>
                </li>
                <li class="nav-item menu-items active">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-icon">
                            <i class="fa fa-dashboard"></i>
                        </span>
                        <span class="menu-title">Dashboard</span>
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default AdminSidebar;