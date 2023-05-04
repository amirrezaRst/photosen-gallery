import React, { useRef, useState } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet';
import config from '../services/config.json';
import Swal from 'sweetalert2';

const Contact = () => {

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const fullNameRef = useRef();
    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();


    const newContact = async () => {
        if (fullName == undefined || fullName == "") return fullNameRef.current.focus();
        else if (email == undefined || email == "") return emailRef.current.focus();
        else if (subject == undefined || subject == "") return subjectRef.current.focus();
        // else if (message == undefined || message == "") return messageRef.current.focus();

        const body = {
            fullName,
            email,
            subject,
            message
        }

        await axios.post(`${config.localDomain}/api/user/newContact`, body).then(res => {
            console.log(res);
            Swal.fire({
                title: '<h3 class="text-dark">Message send</h3>',
                icon: 'success',
                confirmButtonColor: '#1BA87E',
                confirmButtonText: 'OK'
            })
        }).catch(err => {
            console.log(err);
            Swal.fire({
                title: '<h3 class="text-black">Someting went wrong!</h3>',
                html: "<h4 class='text-dark'>Please try later</h4>",
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        })
    }


    return (
        <div class="site-section" data-aos="fade">
            <div class="container">

                <Helmet>
                    <title>Photosen - contact us</title>
                </Helmet>

                <div class="row justify-content-center">

                    <div class="col-md-7">
                        <div class="row mb-5">
                            <div class="col-12 ">
                                <h2 class="site-section-heading text-center">Contact</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-lg-8 mb-5">
                        <form action="#" className='was-validated' onSubmit={e => e.preventDefault()}>


                            <div class="row form-group">
                                <div class="col-md-12">
                                    <label class="text-white" for="lname">Full Name</label>
                                    <input type="text" ref={fullNameRef} id="lname" class="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required />
                                </div>
                            </div>

                            <div class="row form-group">

                                <div class="col-md-12">
                                    <label class="text-white" for="email">Email</label>
                                    {/* <input type="email" id="email" class="form-control form-invalid" /> */}
                                    <input type="email" ref={emailRef} id="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                            </div>

                            <div class="row form-group">

                                <div class="col-md-12">
                                    <label class="text-white" for="subject">Subject</label>
                                    <input type="subject" ref={subjectRef} id="subject" class="form-control" value={subject} onChange={e => setSubject(e.target.value)} required />
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col-md-12">
                                    <label class="text-white" for="message">Message</label>
                                    <textarea name="message" ref={messageRef} id="message" cols="30" rows="7" class="form-control" placeholder="Write your notes or questions here..." value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col-md-12">
                                    <button class="btn btn-primary py-2 px-4 text-black" onClick={newContact}>Send Message</button>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="col-lg-3 ml-auto">
                        <div class="mb-3">
                            <p class="mb-0 font-weight-bold text-white">Address</p>
                            <p class="mb-4">_</p>

                            <p class="mb-0 font-weight-bold text-white">Phone</p>
                            <p class="mb-4"><p style={{ color: "#20c997" }}>+98 990 37 38 378</p></p>

                            <p class="mb-0 font-weight-bold text-white">Email Address</p>
                            <p class="mb-0"><p style={{ color: "#20c997" }}>amirreza.rostami.0073@gmail.com</p></p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;