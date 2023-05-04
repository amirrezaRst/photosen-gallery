import React, { useState, useEffect, useContext } from 'react';

import axios from "axios";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

import config from "../services/config.json";
import { userContext } from '../services/userContext';
import { pictureContext } from '../services/pictureContext';
import "../css/style.css";


const SinglePage = () => {


    const [pictureData, setPictureData] = useState();
    const [imageAddress, setImageAddress] = useState();
    const [userLike, setUserLike] = useState();
    const [likeCount, setLikeCount] = useState();
    const [followStatus, setFollowStatus] = useState();

    const pictureUrl = window.location.pathname.split("/")[2]
    const navigation = useNavigate();
    const contextPicture = useContext(pictureContext)
    const contextUser = useContext(userContext);


    useEffect(() => {
        getSinglePictureApi()
    }, [])
    useEffect(() => {
        if (contextUser.userData.follow) {
            var findUserFollow;
            if (pictureData) {
                let pictureUser = pictureData.user._id;
                console.log(pictureUser);
                findUserFollow = contextUser.userData.follow.findIndex(item => {
                    return item._id == pictureData.user._id
                })
                console.log(findUserFollow);
                if (findUserFollow === -1) {
                    setFollowStatus("doNotFollow");
                }
                else if (findUserFollow != -1) {
                    setFollowStatus("follow");
                }
                if (pictureUser == contextUser.userData._id) {
                    setFollowStatus("userSelf");
                }
            }
        }
    }, [contextUser.userData, pictureData])


    const getSinglePictureApi = async () => {
        await axios.get(`${config.localDomain}/api/user/singlePicture/${pictureUrl}`).then(res => {
            setPictureData(res.data);
            setImageAddress(res.data.picAddress);
            setUserLike(localStorage.getItem(res.data._id) == res.data._id)
            setLikeCount(res.data.like)
        }).catch((err) => {
            console.log(err);
        })
    }

    const result = () => {
        // console.log(contextUser.userData.follow[0]._id);
        // console.log(pictureData.user._id);
        // console.log(contextUser.userData.follow[0]._id == pictureData.user._id);
        console.log(imageAddress);
    }

    const likeApi = async (id) => {
        await axios.get(`${config.localDomain}/api/user/pictureLike/${id}`).then(res => {
            setLikeCount(res.data.like)
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    const dislikeApi = async (id) => {
        await axios.get(`${config.localDomain}/api/user/pictureDislike/${id}`).then(res => {
            setLikeCount(res.data.like)
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


    const like = () => {
        localStorage.setItem(pictureData._id, pictureData._id);
        setUserLike(true);

        likeApi(pictureData._id)
        const newLike = +likeCount++
        setLikeCount(10)
    }
    const dislike = () => {
        localStorage.removeItem(pictureData._id);
        setUserLike(false)

        dislikeApi(pictureData._id);
        const newLike = +likeCount--
        setLikeCount(20)
    }


    const redirectEditPost = () => {
        navigation("/edit-post", { state: { postId: pictureData._id, pictureData } })
    }


    const deletePostApi = async () => {
        await axios.delete(`${config.localDomain}/api/user/deletePicture/${pictureData._id}`).then(res => {
            if (contextUser.userData.role == "admin") navigation("/profile")
            else navigation("/profile")

            var pictures = contextPicture.pictures;
            const pictureIndex = contextPicture.pictures.findIndex(item => {
                return item._id == pictureData._id
            })
            if (pictureIndex > -1) {
                pictures.splice(pictureIndex, 1);
                contextPicture.setPictures(pictures);
            }
            else {
                return false;
            }
            console.log(res);
        }).catch(err => {
            Swal.fire({
                title: 'Something went wrong !',
                text: "You had a problem deleting the post, please try again later",
                icon: "error"
            })
            console.log(err);
        })
    }

    const deletePost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePostApi();
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your post has been deleted.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
            }
        })
    }

    const redirectToProfile = () => {
        navigation(`/profile/${pictureData.user._id}`)
    }



    const handleAddFollow = async () => {
        const body = {
            followId: pictureData.user._id,
        }
        await axios.post(`${config.localDomain}/api/user/addFollow/${contextUser.userData._id}`, body).then(res => {
            console.log(res);
            setFollowStatus("follow");
            // contextUser.setUserData(res.data.user);
        }).catch(err => {
            console.log(err);
        })
    }
    const handleRemoveFollow = async () => {
        const body = {
            followId: pictureData.user._id,
        }
        await axios.post(`${config.localDomain}/api/user/removeFollow/${contextUser.userData._id}`, body).then(res => {
            setFollowStatus("doNotFollow");
            console.log(res);
            // contextUser.setUserData(res.data.user);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>

            <main className="container mb-5">

                <Helmet>
                    <title>Photosen - Post</title>
                </Helmet>

                <div className="text-center">
                    <img onClick={result} src={imageAddress != undefined ? `${config.localDomain}/${imageAddress}` : null} alt="" className='img-fluid single-page-image rounded' />
                </div>
                <div className="mx-auto px-2 py-3 d-flex align-items-center justify-content-between user-info" id='test'>
                    <div className="">
                        <div style={{ display: "inline", cursor: "pointer" }} onClick={redirectToProfile}>
                            <img src={pictureData != undefined ? `${config.localDomain}/${pictureData.user.profileImage}` : null} className="single-page-profile rounded-circle" alt="" />
                            <span className='ml-2 single-page-profile text-decoration-none text-capitalize' style={{ fontWeight: "500" }}>{pictureData != undefined ? pictureData.user.fullName : null}</span>
                        </div>
                        {pictureData != undefined && localStorage.getItem("userId") && pictureData.user._id == localStorage.getItem("userId") ?
                            <div className='d-inline'>
                                <span className='single-page-edit-btn ml-3' onClick={redirectEditPost}>Edit Post</span>
                                <span className='single-page-delete-btn ml-3' onClick={deletePost}>Delete Post</span>
                            </div>
                            : null}

                        {!contextUser.userLogin ?
                            <Link to="/login"><button className="follow-btn ml-4 mt-3" style={{ cursor: "pointer" }}>follow</button></Link> :
                            followStatus == "doNotFollow" ?
                                <button className="follow-btn ml-4 mt-3" style={{ cursor: "pointer" }} onClick={handleAddFollow}>follow</button> :
                                followStatus == "follow" ?
                                    <button className="following-btn mx-2 mt-3" style={{ cursor: "pointer" }} onClick={handleRemoveFollow}>following <i className="fa fa-check"></i></button> :
                                    null
                        }

                    </div>
                    <div className="d-flex align-items-center">
                        <span className='mr-2' style={{ color: "rgb(200, 200, 200)" }}>{likeCount != undefined ? likeCount : null}</span>
                        {userLike ?
                            <i className="fas fa-heart" style={{ color: "red", cursor: "pointer" }} onClick={dislike}></i>
                            :
                            <i className="far fa-heart" style={{ color: "#9b9b9b", cursor: "pointer" }} onClick={like}></i>
                        }
                        <a href={`${config.localDomain}/api/user/download/OuHvJ87Ra_portrait_2.jpg`} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-download ml-3" style={{ cursor: "pointer", color: "rgb(170, 170, 170)", fontSize: "1.2rem" }}></i>
                        </a>
                    </div>
                </div>
                <div className='single-page-subtitle mx-auto mt-3'>
                    <p>{pictureData != undefined ? pictureData.subtitle : null}</p>
                </div>

            </main>

        </React.Fragment>
    );
}

export default SinglePage;