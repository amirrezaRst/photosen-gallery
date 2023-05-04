import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../services/userContext';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import config from "../services/config.json";
import Swal from 'sweetalert2';
import SingleImageCard from './galleryPage/SingleImageCard';


const Profile = () => {

    const [personalPage, setPersonalPage] = useState();
    const [singleUser, setSingleUser] = useState();
    const [followStatus, setFollowStatus] = useState();

    const context = useContext(userContext);
    const pageUrl = window.location.pathname.split("/")[2];
    const navigation = useNavigate();

    const result = () => {
        // console.log(singleUser.follow.length);
        console.log(singleUser);
    }

    useEffect(() => {

        var findUserFollow;
        if (context.userData.follow) {
            if (singleUser) {
                // alert("running")
                let targetUser = singleUser._id;
                console.log(targetUser);
                findUserFollow = context.userData.follow.findIndex(item => {
                    return item._id == singleUser._id
                })
                if (findUserFollow == -1) {
                    setFollowStatus("doNotFollow");
                }
                else if (findUserFollow != -1) {
                    setFollowStatus("follow");
                }
                if (targetUser == context.userData._id) {
                    setFollowStatus("userSelf");
                }
            }
        }

    }, [context.userData, singleUser])

    const getUserApi = async () => {
        await axios.get(`${config.localDomain}/api/user/userProfile/${pageUrl}`).then(res => {
            setSingleUser(res.data)
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (context.userData) {
            if (pageUrl == context.userData._id) {
                setPersonalPage(true)
            }
            else {
                setPersonalPage(false)
                getUserApi()
            }
        }
        else {
            setPersonalPage(false)
            getUserApi()
        }
    }, [context.userData])

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

    const handleAddFollow = async () => {
        const body = {
            followId: singleUser._id,
        };
        await axios.post(`${config.localDomain}/api/user/addFollow/${context.userData._id}`, body).then(res => {
            setFollowStatus("follow");
            // context.setUserData(res.data.user);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    const handleRemoveFollow = async () => {
        const body = {
            followId: singleUser._id,
        }
        await axios.post(`${config.localDomain}/api/user/removeFollow/${context.userData._id}`, body).then(res => {
            setFollowStatus("doNotFollow");
            // context.setUserData(res.data.user);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }



    const handleFollowing = () => {
        // alert("fallowing list")
    }

    return (
        <main class="site-section py-2" data-aos="fade">
            <div class="container-fluid">

                <Helmet>
                    <title>Photosen - Profile</title>
                </Helmet>

                <header class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="mb-5">

                            <div className="text-center">

                                <div className="">
                                    <img src={singleUser ? `${config.localDomain}/${singleUser.profileImage}` : `${config.localDomain}/${context.userData.profileImage}`} className="profile-image rounded-circle mx-auto d-block" alt="" srcset="" />
                                    <p className='profile-username mt-3 mb-2 text-capitalize' onClick={result}>{singleUser ? singleUser.fullName : context.userData ? context.userData.fullName : null}</p>
                                    <p className='profile-email mb-2'>{singleUser ? singleUser.email : context.userData ? context.userData.email : null}</p>
                                    <p className='profile-email'>{singleUser ? singleUser.follow == undefined ? <span>Following 0</span> : <span>Following {singleUser.follow.length}</span> : context.userData ? context.userData.follow == undefined ? <span>Following 0</span> : <span onClick={handleFollowing}>Following {context.userData.follow.length}</span> : null} </p>
                                </div>
                                {personalPage ?
                                    <div className="">
                                        <Link to="/new-post"><button className="user-profile-btn mx-2 mt-3" style={{ cursor: "pointer" }}>Add Post <i className="fa fa-plus"></i></button></Link>
                                        {context.userData.role == "admin" ?
                                            <Link to="/dashboard" className="user-profile-btn mx-2" style={{ cursor: "pointer",padding:".3rem .6rem" }}><i class="fa-solid fa-user-shield"></i></Link> :
                                            null
                                        }
                                        <button className="logout-btn mx-2" style={{ cursor: "pointer" }} onClick={logout}><i className="fa fa-sign-out"></i></button>
                                    </div> :
                                    <div className="">

                                        {/* <button className="follow-btn mx-2 mt-3" onClick={handleFollow} style={{ cursor: "pointer" }}>follow</button> */}
                                        {!context.userLogin ?
                                            <Link to="/login"><button className="follow-btn ml-4 mt-3" style={{ cursor: "pointer" }}>follow</button></Link> :
                                            followStatus == "doNotFollow" ?
                                                <button className="follow-btn ml-4 mt-3" style={{ cursor: "pointer" }} onClick={handleAddFollow}>follow</button> :
                                                followStatus == "follow" ?
                                                    <button className="following-btn mx-2 mt-3" style={{ cursor: "pointer" }} onClick={handleRemoveFollow}>following <i className="fa fa-check"></i></button> :
                                                    null
                                        }

                                    </div>
                                }

                            </div>

                        </div>
                    </div>

                </header>

                <main className='container-fluid'>
                    <p style={{ color: "rgb(200, 200, 200)", fontWeight: "normal" ,fontSize:"1.6rem" }} className="my-5">Gallery</p>
                    <div class="row" id="lightgallery">

                        {singleUser ? singleUser.gallery.map(item => <SingleImageCard id={item._id} image={item.picAddress} path="profile" />) : context.userData && context.userData.gallery ? context.userData.gallery.map(item => <SingleImageCard id={item._id} image={item.picAddress} path="profile" />) : null}

                    </div>
                </main>
            </div>
        </main>
    );
}

export default Profile;