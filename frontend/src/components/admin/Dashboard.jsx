import React, { useContext, useEffect, useRef, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

import { userContext } from '../../services/userContext';
import axios from 'axios';
import config from "../../services/config.json";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import SingleDashboardUser from './SingleDashboardUser';
import "../../css/admin-style.css"


const Dashboard = () => {

    const context = useContext(userContext);

    //! Api States
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);

    //! NewUser State
    const [fullNameInput, setFullNameInput] = useState(null);
    const [emailInput, setEmailInput] = useState(null);
    const [passwordInput, setPasswordInput] = useState(null);
    const [roleInput, setRoleInput] = useState(null);

    //! Change Password State
    const [changePassword, setChangePassword] = useState(null);
    const [changeConfirmPassword, setChangeConfirmPassword] = useState(null);
    const [confirmClass, setConfirmClass] = useState("d-none")
    // text-danger mt-3

    //! NewUser Ref
    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();

    //! Change Password Ref
    const changePasswordRef = useRef();
    const changeConfirmPasswordRef = useState();



    const getUserApi = async () => {
        await axios.get(`${config.localDomain}/api/user/userList`).then(res => {
            // console.log(res);
            setUsers(res.data)
        }).catch(err => {
            console.log(err);
        })
    }
    const getPostApi = async () => {
        await axios.get(`${config.localDomain}/api/user/pictureList`).then(res => {
            // console.log(res);
            setPosts(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    const getContactApi = async () => {
        await axios.get(`${config.localDomain}/api/user/contactList`).then(res => {
            console.log(res);
            setContacts(res.data)
        }).catch(err => {
            console.log(err);
        })
    }



    useEffect(() => {
        getUserApi();
        getPostApi();
        getContactApi();
    }, [])



    //! Post Api Function
    const newUserApi = async () => {
        if (fullNameInput == null || fullNameInput == "") return fullNameRef.current.focus();
        else if (emailInput == null || emailInput == "") return emailRef.current.focus();
        else if (passwordInput == null || passwordInput == "") return passwordRef.current.focus();
        else if (roleInput == null || roleInput == "") return roleRef.current.focus();


        const body = {
            fullName: fullNameInput,
            email: emailInput,
            password: passwordInput,
            role: roleInput
        }

        await axios.post(`${config.localDomain}/api/user/newUser`, body, { headers: { "x-auth-token": localStorage.getItem("token") } }).then(res => {
            console.log(res);
            Swal.fire({
                title: '<h3 class="text-black">User created</h3>',
                text: 'user has been created.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            getUserApi();
        }).catch(err => {
            console.log(err);
            toast.error(`Something Went Wrong!`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            Swal.fire({
                title: '<h3 class="text-black">Something went wrong!</h3>',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        });
    }

    const deletePost = async (id) => {
        // console.log(id);
        Swal.fire({
            title: '<h3 class="text-black">Are you sure?</h3>',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${config.localDomain}/api/user/deletePicture/${id}`).then(res => {
                    Swal.fire({
                        title: '<h3 class="text-black">Deleted!</h3>',
                        text: 'post has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                }).catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: '<h3 class="text-black">Something went wrong!</h3>',
                        text: 'The post was not deleted.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                })
            }
        })
    }



    //! Contact Api Function
    const deleteContactApi = (id) => {
        Swal.fire({
            title: '<h3 class="text-black">Are you sure?</h3>',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${config.localDomain}/api/user/deleteContact/${id}`).then(res => {
                    Swal.fire({
                        title: '<h3 class="text-black">Deleted!</h3>',
                        text: 'Contact has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                    setContacts(res.data.contacts);
                }).catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: '<h3 class="text-black">Something went wrong!</h3>',
                        text: 'The contact was not deleted.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                })
            }
        })
    }

    const answeredContactApi = async (id) => {
        await axios.get(`${config.localDomain}/api/user/answered/${id}`).then(res => {
            console.log(res);
            Swal.fire({
                title: '<h3 class="text-black">completed</h3>',
                text: 'Contact has been completed.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            setContacts(res.data.allContact);
        }).catch(err => {
            console.log(err);
            Swal.fire({
                title: '<h3 class="text-black">Something went wrong!</h3>',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })

        })
    }


    const changePasswordApi = async () => {
        if (changePassword == null || changePassword == "") return changePasswordRef.current.focus();
        else if (changeConfirmPassword == null || changeConfirmPassword == "") return changeConfirmPasswordRef.current.focus();
        else if (changePassword != changeConfirmPassword) {
            setConfirmClass("text-danger mt-3");
            return changeConfirmPasswordRef.current.focus()
        };
        setConfirmClass("d-none");


        const body = {
            password: changePassword,
            confirmPassword: changeConfirmPassword
        }

        await axios.put(`${config.localDomain}/api/user/changePassword/${context.userData._id}`, body, { headers: { "x-auth-token": localStorage.getItem("token") } }).then(res => {
            console.log(res);
            Swal.fire({
                title: '<h3 class="text-black">Changed</h3>',
                text: 'Password has been changed.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }).catch(err => {
            console.log(err);
            Swal.fire({
                title: '<h3 class="text-black">Something went wrong!</h3>',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        })
    }


    const result = () => {
        console.log(context.userData);
    }


    return (
        <AdminLayout>
            <div class="main-panel">
                <div class="content-wrapper">

                    {/* <button className="btn btn-light mb-5 btn-block" onClick={result}>Result</button> */}

                    <div style={{ cursor: "pointer" }}>
                        <h6 className='text-danger mb-4' data-toggle="modal" data-target="#exampleModal2">Change Password <i className="fa fa-key"></i></h6>
                    </div>

                    <div class="modal fade" id="exampleModal2" tabindex="10" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content bg-dark">
                                <div class="modal-header">
                                    <h5 class="modal-title text-white" id="exampleModalLabel2">Change Password</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body py-0">

                                    <div class="grid-margin stretch-card mb-0">
                                        <div class="card border-0">
                                            <div class="card-body bg-dark">

                                                <form class="forms-sample was-validated" onSubmit={e => e.preventDefault()}>

                                                    <div class="form-group mb-4">
                                                        <label for="inputPassword" style={{ color: "rgb(220,220,220)" }}>Password</label>
                                                        <input type="password" ref={changePasswordRef} class="form-control" id="inputPassword" placeholder="Password" value={changePassword} onChange={e => setChangePassword(e.target.value)} required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="inputPassword" style={{ color: "rgb(220,220,220)" }}>Confirm Password</label>
                                                        <input type="password" ref={changeConfirmPasswordRef} class="form-control" id="inputPassword" placeholder="Confirm Password" value={changeConfirmPassword} onChange={e => setChangeConfirmPassword(e.target.value)} required />
                                                        <label for="inputPassword" className={confirmClass} style={{ fontWeight: "500" }}>Confirm password and password is different</label>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn" style={{ background: "#0074bc" }} onClick={changePasswordApi}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        {/* <AdminChartItem price={12.34} percent={+3.5} title={"Potential growth"} /> */}
                    </div>

                    {/* <AdminProjects /> */}

                    {/* <AdminSpecification food={foods.length} sales={sales} user={users.length} /> */}
                    {/* profileImage */}

                    {/* <AdminOrder /> */}


                    {/* ____Start User List____ */}
                    <div class="row">
                        <div class="col-12 grid-margin">
                            <div class="card">
                                <div class="card-body admin-header-item">
                                    <div className="d-flex justify-content-between mb-2">
                                        <h4 class="card-title">Users</h4>
                                        <i class="fa-solid fa-user-plus dashboard-user-btn" data-toggle="modal" data-target="#exampleModal"></i>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content bg-dark">

                                                    <div class="modal-header">
                                                        <h4 className='text-white'>New User</h4>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true" className='text-white'>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body py-1 bg-dark">

                                                        <div class="grid-margin stretch-card mb-0">
                                                            <div class="card border-0">
                                                                <div class="card-body bg-dark">

                                                                    <form class="forms-sample was-validated" onSubmit={e => e.preventDefault()}>
                                                                        <div class="form-group">
                                                                            <label for="inputUsername" style={{ color: "rgb(220,220,220)" }}>Full Name</label>
                                                                            <input type="text" ref={fullNameRef} class="form-control" id="inputUsername" placeholder="Username" value={fullNameInput} onChange={e => setFullNameInput(e.target.value)} required />
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="inputEmail" style={{ color: "rgb(220,220,220)" }}>Email</label>
                                                                            <input type="email" ref={emailRef} class="form-control" id="inputEmail" placeholder="Email" value={emailInput} onChange={e => setEmailInput(e.target.value)} required />
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="inputPassword" style={{ color: "rgb(220,220,220)" }}>Password</label>
                                                                            <input type="password" ref={passwordRef} class="form-control" id="inputPassword" placeholder="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} required />
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="inputRole" style={{ color: "rgb(220,220,220)" }}>Role</label>
                                                                            <input type="text" ref={roleRef} class="form-control" id="inputRole" placeholder="Role" value={roleInput} onChange={e => setRoleInput(e.target.value)} required />
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn" style={{ background: "#0074bc" }} onClick={newUserApi}>Submit</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th> Full Name </th>
                                                    <th> Email </th>
                                                    <th>Role</th>
                                                    <th>_</th>
                                                </tr>
                                            </thead>
                                            <tbody className='user-info-list'>

                                                {users.map(item => <SingleDashboardUser fullName={item.fullName} email={item.email} role={item.role} id={item._id} />)}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ____End User List____ */}


                    <div className="row my-5">
                        {/* {posts.map(item => <SingleDashboardPost id={item._id} fullName={item.user.fullName} profile={item.user.profileImage} image={item.picAddress} subtitle={item.subtitle} like={item.like} />)} */}
                        {posts.map(item =>
                            <div className="col-12 col-md-4">
                                <div class="card profile-card-2" onClick={() => deletePost(item._id)}>
                                    <div class="card-img-block">
                                        <img src={`${config.localDomain}/${item.picAddress}`} class="img-fluid single-profile-card" alt="Card image cap" />
                                    </div>
                                    <div class="card-body pt-5 text-center text-white">
                                        <img src={`${config.localDomain}/${item.user.profileImage}`} alt="profile-image" class="profile" style={{ filter: "none" }} />
                                        <h5 class="card-title font-weight-normal">{item.user.fullName}</h5>
                                        <p class="card-text text-left text-justify">{item.subtitle}</p>
                                        <div className="text-left d-flex align-items-center justify-content-between">
                                            <div>
                                                <i className="fa fa-heart text-danger mr-2"></i>
                                                <span style={{ fontSize: "1.2rem" }}>{item.like}</span>
                                            </div>
                                            <div className='mt-3'>
                                                <i class="fa-solid fa-trash-xmark text-danger" style={{ fontSize: "1.3rem" }}></i>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>


                    <div class="row">
                        <div class="col-md-12 col-xl-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">

                                    <div class="d-flex flex-row justify-content-between">
                                        <h4 class="card-title">Contacts</h4>
                                        <p class="text-muted mb-1 small">View all</p>
                                    </div>
                                    <div class="preview-list">

                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th className='text-white'> Full Name </th>
                                                        <th className="text-white"> Email </th>
                                                        <th className="text-white"> Subject </th>
                                                        <th className="text-white"> Message </th>
                                                        <th className="text-white"> Answering </th>
                                                        <th className="text-white"> - </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='user-info-list'>

                                                    {contacts.map(item =>
                                                        <tr>
                                                            <td>{item.fullName}</td>
                                                            <td>{item.email}</td>
                                                            <td> {item.subject} </td>
                                                            <td style={{ textOverflow: "ellipsis" }}> {item.message} </td>
                                                            <td>
                                                                <div class={item.answering == true ? "badge badge-outline-success" : "badge badge-outline-danger"}>{item.answering == true ? "true" : "false"}</div>
                                                            </td>
                                                            <td className='px-0 text-center'>
                                                                <div class="dropleft w-100 h-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="fa fa-trash-can mx-3 text-danger" style={{ fontSize: "1.3rem" }} onClick={() => deleteContactApi(item._id)}></i>
                                                                    {item.answering == false ?
                                                                        <i className='fa fa-check text-success' style={{ fontSize: "1.3rem" }} onClick={() => answeredContactApi(item._id)}></i> :
                                                                        null
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}

export default Dashboard;