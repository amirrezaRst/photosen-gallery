import React, { useContext } from 'react';

import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import { userContext } from '../../services/userContext';
import config from "../../services/config.json";

const AdminTopNav = () => {

    const context = useContext(userContext);
    const navigation = useNavigate();

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to log out?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Log Out'
        }).then(async (result) => {
            if (result.isConfirmed) {

                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                context.setUserLogin(false);
                context.setUserData({})
                console.log(localStorage.getItem("token"));
                console.log(localStorage.getItem("userId"));
                console.log(context.userLogin);
                console.log(context.userData);

                Swal.fire({
                    title: 'Log Out!',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                navigation("/")
            }
        })
    }


    return (
        <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item dropdown d-none d-lg-block">
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
                    <h6 class="p-3 mb-0">Projects</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-file-outline text-primary"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">Software Development</p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-web text-info"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">UI Development</p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-layers text-danger"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">Software Testing</p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <p class="p-3 mb-0 text-center">See all projects</p>
                </div>
            </li>
            <li class="nav-item nav-settings d-none d-lg-block">
                <a class="nav-link" href="#">
                    {/* <i class="mdi mdi-view-grid"></i> */}
                    <i className="fa fa-grid-2"></i>
                </a>
            </li>
            <li class="nav-item dropdown border-left">
                <a class="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                    {/* <i class="mdi mdi-email"></i> */}
                    <i className='fa-solid fa-envelope'></i>
                    <span class="count bg-success"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 class="p-3 mb-0">Messages</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <img src="assets/images/faces/face4.jpg" alt="image" class="rounded-circle profile-pic" />
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">Mark send you a message</p>
                            <p class="text-muted mb-0"> 1 Minutes ago </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <img src="assets/images/faces/face2.jpg" alt="image" class="rounded-circle profile-pic" />
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">Cregh send you a message</p>
                            <p class="text-muted mb-0"> 15 Minutes ago </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <img src="assets/images/faces/face3.jpg" alt="image" class="rounded-circle profile-pic" />
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject ellipsis mb-1">Profile picture updated</p>
                            <p class="text-muted mb-0"> 18 Minutes ago </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <p class="p-3 mb-0 text-center">4 new messages</p>
                </div>
            </li>
            <li class="nav-item dropdown border-left">
                <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                    {/* <i class="mdi mdi-bell"></i> */}
                    <i className="fa fa-bell"></i>
                    <span class="count bg-danger"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 class="p-3 mb-0">Notifications</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-calendar text-success"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject mb-1">Event today</p>
                            <p class="text-muted ellipsis mb-0"> Just a reminder that you have an event today </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-settings text-danger"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject mb-1">Settings</p>
                            <p class="text-muted ellipsis mb-0"> Update dashboard </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="mdi mdi-link-variant text-warning"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject mb-1">Launch Admin</p>
                            <p class="text-muted ellipsis mb-0"> New admin wow! </p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <p class="p-3 mb-0 text-center">See all notifications</p>
                </div>
            </li>
            <li class="nav-item dropdown">

                <a class="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                    <div class="navbar-profile">
                        {/* <img class="img-xs rounded-circle single-profile-card" src="/images/faces/face15.jpg" alt="" /> */}
                        <img class="img-xs rounded-circle single-profile-card" src={`${config.localDomain}/${context.userData.profileImage}`} alt="" />
                        <p class="mb-0 d-none d-sm-block navbar-profile-name text-capitalize">{context.userData.fullName}</p>
                        <i class="fa fa-angle-down text-white ml-2"></i>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                    <h6 class="p-3 mb-0 text-white">Profile</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item disabled">
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="fa fa-cog text-success"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject mb-1">Settings</p>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item preview-item" onClick={logout}>
                        <div class="preview-thumbnail">
                            <div class="preview-icon bg-dark rounded-circle">
                                <i class="fa fa-sign-out-alt text-danger"></i>
                            </div>
                        </div>
                        <div class="preview-item-content">
                            <p class="preview-subject mb-1">Log out</p>
                        </div>
                    </a>

                </div>
            </li>
        </ul>
    );
}

export default AdminTopNav;