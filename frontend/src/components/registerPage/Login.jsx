import React, { useRef, useState, useContext, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { userContext } from "../../services/userContext";
import config from "../../services/config.json";
import { Helmet } from 'react-helmet';


const Login = () => {

    const params = useLocation();
    const context = useContext(userContext);
    const navigation = useNavigate();

    //! Field State
    const [emailField, setEmailField] = useState();
    const [passwordField, setPasswordField] = useState();

    //! Class State
    const [emailClass, setEmailClass] = useState("form-control");
    const [passwordClass, setPasswordClass] = useState("form-control");
    const [validateClass, setValidateClass] = useState("d-none");

    //! Field Ref
    const emailRef = useRef();
    const passwordRef = useRef();


    useEffect(() => {
        if (params.state != null) {
            setEmailField(params.state.email);
            setPasswordField(params.state.password);
        }
    }, [params])

    const loginApi = async () => {
        if (emailField == undefined || emailField == "") {
            emailRef.current.focus();
            setEmailClass("form-control form-invalid")
        }
        else if (passwordField == undefined || passwordField == "") {
            passwordRef.current.focus();
            setPasswordClass("form-control form-invalid")
        }

        const body = {
            email: emailField,
            password: passwordField
        }

        await axios.post(`${config.localDomain}/api/user/login`, body).then(res => {
            setValidateClass("d-none")
            localStorage.setItem("token", res.headers["x-auth-token"])
            localStorage.setItem("userId", res.data.user._id)
            // console.log(res.data.user._id);
            context.setUserLogin(true);
            context.setUserData(res.data.user)
            toast.success(`${res.data.user.fullName}, you have successfully logged in`, {
                position: "bottom-right",
                theme: "dark",
                closeOnClick: true
            })
            navigation("/");
        }).catch(err => {
            if (err.response.status == 422) setValidateClass("text-danger")
        })
    }


    return (
        <div class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - Login</title>
                </Helmet>

                <div class="col-lg-8 mb-5 mx-auto">
                    <form onSubmit={e => e.preventDefault()}>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="email">Email</label>
                                {/* <input type="email" id="email" class="form-control form-invalid" /> */}
                                <input type="email" id="email" ref={emailRef} class={emailClass} value={emailField} onChange={e => setEmailField(e.target.value)} />
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="text-white" for="subject">Password</label>
                                <input type="password" id="subject" style={{ marginBottom: "10px" }} ref={passwordRef} class={passwordClass} value={passwordField} onChange={e => setPasswordField(e.target.value)} />
                                <span className={validateClass}>Email or password is not correct!</span>
                            </div>
                        </div>

                        <div className="form-group mt-1">
                            <Link to="/signup" className='d-block'>Create account</Link>
                            <Link to="/forgot-password">Forgot password</Link>
                        </div>

                        <div class="row form-group mt-5">
                            <div class="col-md-12">
                                <button class="btn btn-primary py-2 px-4 text-black" onClick={loginApi}>Log In</button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;