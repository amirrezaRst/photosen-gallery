import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet';

import config from "../../services/config.json";


const Signup = () => {

    //! Field State
    const [nameField, setNameField] = useState();
    const [emailField, setEmailField] = useState();
    const [passwordField, setPasswordField] = useState();
    const [confirmPasswordField, setConfirmPasswordField] = useState();
    const [avatarField, setAvatarField] = useState(null);

    //! Class State
    const [nameClass, setNameClass] = useState("form-control");
    const [emailClass, setEmailClass] = useState("form-control");
    const [passwordClass, setPasswordClass] = useState("form-control");
    const [confirmClass, setConfirmClass] = useState("form-control");
    const [avatarClass, setAvatarClass] = useState("d-none")

    //! Field Ref
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();


    const registerApi = async () => {
        // console.log(avatarField);
        if (nameField == undefined || nameField == "") {
            nameRef.current.focus();
            setNameClass("form-control form-invalid")
        }
        else if (emailField == undefined || emailField == "") {
            emailRef.current.focus();
            setEmailClass("form-control form-invalid")
        }
        else if (passwordField == undefined || passwordField == "") {
            passwordRef.current.focus();
            setPasswordClass("form-control form-invalid")
        }
        // else if (avatarField == null || avatarField == "") {
        //     setAvatarClass("text-danger")
        // }
        else if (passwordField != confirmPasswordField) {
            setConfirmClass("form-control form-invalid")
            confirmPasswordRef.current.focus();
        }


        const formData = new FormData();
        formData.append("fullName", nameField);
        formData.append("email", emailField);
        formData.append("password", passwordField);
        formData.append("avatar", avatarField);

        await axios.post(`${config.localDomain}/api/user/register`, formData).then(res => {
            console.log(res);
            toast.success("You have successfully registered", {
                position: "bottom-right",
                theme: "dark",
                closeOnClick: true
            })
            navigate("/login", {
                state: {
                    email: emailField,
                    password: passwordField
                }
            })
        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong!", {
                position: "bottom-right",
                theme: "dark",
                closeOnClick: true
            })
        })
    }


    return (
        <div class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - Sign up</title>
                </Helmet>

                <div class="col-lg-8 mb-5 mx-auto">
                    <form onSubmit={e => e.preventDefault()}>


                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="lname">Full Name</label>
                                <input type="text" id="lname" class={nameClass} ref={nameRef} value={nameField} onChange={e => setNameField(e.target.value)} />
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="email">Email</label>
                                <input type="email" id="email" class={emailClass} ref={emailRef} value={emailField} onChange={e => setEmailField(e.target.value)} />
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="password">Password</label>
                                <input type="password" id="password" class={passwordClass} ref={passwordRef} value={passwordField} onChange={e => setPasswordField(e.target.value)} />
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="cPassword">Confirm Password</label>
                                <input type="password" id="cPassword" class={confirmClass} ref={confirmPasswordRef} value={confirmPasswordField} onChange={e => setConfirmPasswordField(e.target.value)} />
                            </div>
                        </div>

                        <div className="row form-group mt-4">
                            <div className="col-md-12">
                                <label for="actual-btn" className='text-white'>Avatar</label>
                                <input type="file" id="actual-btn" hidden onChange={e => setAvatarField(e.target.files[0])} />
                                {/* <label for="actual-btn" className='w-100' id='register-avatar'>Choose File</label> */}
                                <label for="actual-btn" className='w-100' id='register-avatar'>{avatarField ? avatarField.name : "Choose File"}</label>
                                <span className={avatarClass}>Please select a profile picture</span>
                            </div>
                        </div>
                        <div className="row form-group mt-1">
                            <Link to="/login">I have a acount</Link>
                        </div>


                        <div class="row form-group mt-5">
                            <div class="col-md-12">
                                <button class="btn btn-primary py-2 px-4 text-black" onClick={registerApi}>Sign Up</button>
                            </div>
                        </div>


                    </form>
                </div>

            </div>
        </div>
    );
}

export default Signup;