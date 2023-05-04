import React, { useRef, useState } from 'react';

import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { userContext } from "../../services/userContext";
import config from "../../services/config.json";
import { Helmet } from 'react-helmet';


const ForgotPassword = () => {
    //! Field State
    const [emailField, setEmailField] = useState();

    //! Class State
    const [emailClass, setEmailClass] = useState("form-control");
    const [labelClass, setLabelClass] = useState("d-none");

    //! Field Ref
    const emailRef = useRef();



    const forgotPasswordApi = async () => {
        if (emailField == undefined || emailField == "") {
            emailRef.current.focus();
            setEmailClass("form-control form-invalid")
            return setLabelClass("text-danger mt-2")
        }
        setEmailClass("form-control");
        setLabelClass("d-none");

        const body = {
            email: emailField
        };

        await axios.post(`${config.localDomain}/api/user/forgotPassword`, body).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        // console.log(emailField);
    }




    return (
        <div class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - Forgot Password</title>
                </Helmet>

                <div class="col-lg-8 mb-5 mx-auto">
                    <form onSubmit={e => e.preventDefault()}>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="email">Email</label>
                                {/* <input type="email" id="email" class="form-control form-invalid" /> */}
                                <input type="email" id="email" ref={emailRef} class={emailClass} value={emailField} onChange={e => setEmailField(e.target.value)} />
                                <label for="email" className={labelClass} style={{ fontWeight: "500", fontSize: "1.05rem" }}>Please enter your email</label>
                            </div>
                        </div>

                        <div className="row form-group mt-1">
                            <Link to="/login">Go back to login</Link>
                        </div>

                        <div class="row form-group mt-5">
                            <div class="col-md-12">
                                <button class="btn btn-primary py-2 px-4 text-black" onClick={forgotPasswordApi}>Send Email</button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;