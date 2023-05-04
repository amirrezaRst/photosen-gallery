import axios from 'axios';
import React, { useRef, useState } from 'react';

import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from "../../services/config.json";


const ChangePassword = () => {

    const token = window.location.pathname

    //! Field State
    const [passwordField, setPasswordField] = useState();
    const [confirmField, setConfirmField] = useState();

    //! Field Class
    const [passwordClass, setPasswordClass] = useState("form-control");
    const [confirmClass, setConfirmClass] = useState("form-control")
    const [passwordVClass, setPasswordVClass] = useState("d-none");
    const [confirmVClass, setConfirmVClass] = useState("d-none");

    //! Field Ref
    const passwordRef = useRef();
    const confirmRef = useRef();


    const changePasswordApi = async () => {
        if (passwordField == undefined || passwordField == "") {
            setPasswordClass("form-control form-invalid");
            setPasswordVClass("text-danger mt-2");
            return passwordRef.current.focus();
        }
        else if (confirmField == undefined || confirmField == "") {
            setPasswordClass("form-control");
            setPasswordVClass("d-none");
            setConfirmClass("form-control form-invalid");
            setConfirmVClass("text-danger mt-2");
            return confirmRef.current.focus();
        }
        setConfirmClass("form-control");
        setConfirmVClass("d-none");

        const body = {
            password: passwordField,
            confirmPassword: confirmField
        }
        await axios.put(`${config.useLocation}/api/user/changePassword/`, { headers: { "x-auth-token": token } }, body).then(res => {
            console.log(res);
            Swal.fire({
                title: '<h3 class="text-black">Password changed</h3>',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }).catch(err => {
            console.log(err);
        })
    }


    const result = () => {
        console.log(token);
    }

    return (

        <div class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - Login</title>
                </Helmet>

                <div class="col-lg-8 mb-5 mx-auto">
                    <form onSubmit={e => e.preventDefault()} className="was-validated">

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="subject">Password</label>
                                <input type="password" id="subject" style={{ marginBottom: "10px" }} ref={passwordRef} class={passwordClass} value={passwordField} onChange={e => setPasswordField(e.target.value)} required />
                                <span className={passwordVClass}>Please enter password!</span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="subject">Confirm Password</label>
                                <input type="password" id="subject" style={{ marginBottom: "10px" }} ref={confirmRef} class={confirmClass} value={confirmField} onChange={e => setConfirmField(e.target.value)} required />
                                <span className={confirmVClass}>Please enter confirm password!</span>
                            </div>
                        </div>

                        <div class="row form-group mt-5">
                            <div class="col-md-12">
                                <button class="btn btn-primary py-2 px-4 text-black" onClick={changePasswordApi}>Log In</button>
                            </div>
                        </div>
                        <button className="btn btn-light" onClick={result}>Result</button>

                    </form>
                </div>

            </div>
        </div>

    );
}

export default ChangePassword;