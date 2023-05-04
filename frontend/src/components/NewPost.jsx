import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

import config from "../services/config.json";
import { pictureContext } from '../services/pictureContext';


const NewPost = () => {

    const navigation = useNavigate();
    const context = useContext(pictureContext);

    var pictures = context.pictures;

    //! Field State
    const [titleField, setTitleField] = useState();
    const [categoryField, setCategoryField] = useState();
    const [imageField, setImageField] = useState(null);


    //! Class State
    const [titleClass, setTitleClass] = useState("form-control"); // form-invalid
    const [categoryClass, setCategoryClass] = useState("form-control newpost-select-box");
    const [imageClass, setImageClass] = useState("d-none");
    const [optionClass, setOptionClass] = useState("d-none");

    //! Field Ref
    const titleRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();

    const createPostApi = async () => {
        if (!imageField) {
            setImageClass("text-danger")
            imageRef.current.focus();
        }
        else if (titleField == undefined || titleField == "") {
            setTitleClass("form-control form-invalid")
            setImageClass("d-none")
            return titleRef.current.focus();
        }
        else if (categoryField == null) {
            setCategoryClass("form-control form-invalid");
            setTitleClass("form-control")
            setOptionClass("text-danger")
            return categoryRef.current.focus();
        }
        else {
            setTitleClass("form-control")
            setOptionClass("d-none")
        }

        const formData = new FormData();
        formData.append("picture", imageField);
        formData.append("subtitle", titleField);
        formData.append("category", categoryField);
        formData.append("user", localStorage.getItem("userId"));
        formData.append("like", localStorage.getItem("userId"));

        await axios.post(`${config.localDomain}/api/user/newPicture`, formData).then(res => {
            pictures.push(res.data.picture);
            context.setPictures(pictures)
            Swal.fire({
                title: 'Post Created',
                text: "The post was created successfully, click the button below to see it.",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'See post'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigation(`/picture/${res.data.picture._id}`)
                }
            })
            console.log(res);
        }).catch(err => {
            Swal.fire({
                title: 'Something went wrong !',
                text: "You had a problem creating the post, please try again later",
                icon: "error"
            })
            console.log(err);
        })
    }

    const result = () => {
        // console.log(context.pictures);
        console.log(pictures);
    }



    return (
        <main class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - New Post</title>
                </Helmet>

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-2">
                            <div class="col-12 ">
                                <h2 class="site-section-heading text-center">New Post</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-lg-8 mb-5 mx-auto">
                    <form onSubmit={e => e.preventDefault()}>

                        <div className="row form-group mt-4">
                            <div className="col-md-12">
                                <label for="actual-btn" className='text-white'>Image</label>
                                <input type="file" id="actual-btn" hidden onChange={e => setImageField(e.target.files[0])} />
                                {/* <input type="file" id="actual-btn" hidden /> */}
                                <label for="actual-btn" className='w-100' id='register-avatar'>{imageField ? imageField.name : "Choose File"}</label>
                                <span className={imageClass}>Please select a image</span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="title">Title</label>
                                <input type="text" id="title" ref={titleRef} class={titleClass} value={titleField} onChange={e => setTitleField(e.target.value)} />
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="subject">Category</label>
                                <select className={categoryClass} name="" id="" ref={categoryRef} onChange={e => setCategoryField(e.target.value)}>
                                    <option value=""></option>
                                    <option value="nature">Nature</option>
                                    <option value="portrait">portrait</option>
                                    <option value="people">People</option>
                                    <option value="architecture">Architecture</option>
                                    <option value="animal">Animal</option>
                                    <option value="sport">Sport</option>
                                    <option value="travle">Travel</option>
                                    <option value="galaxy">Galaxy</option>
                                </select>
                                <span className={optionClass}>Please select one of the categories</span>
                            </div>
                        </div>

                        <div class="row form-group mt-5">
                            <div class="col-md-12">
                                <button class="btn btn-primary py-2 px-4 text-black" onClick={createPostApi}>Create Post</button>
                            </div>
                        </div>
                        {/* <button className="btn btn-primary" onClick={result}>Result</button> */}

                    </form>
                </div>


            </div>
        </main>
    );
}

export default NewPost;