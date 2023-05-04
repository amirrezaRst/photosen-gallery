import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router';
import axios from "axios";
import jwt_decode from "jwt-decode";
import AOS from 'aos';
import { ToastContainer } from "react-toastify";
import { pictureContext } from '../services/pictureContext';
import { userContext } from "../services/userContext";
import config from "../services/config.json";

import MainLayout from "../components/layouts/MainLayout"
import Home from '../components/Home';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

import Gallery from "../components/galleryPage/Gallery"
import Nature from '../components/galleryPage/Nature';
import Portrait from '../components/galleryPage/Portrait';
import People from '../components/galleryPage/People';
import Architecture from '../components/galleryPage/Architecture';
import Animals from '../components/galleryPage/Animals';
import Sports from '../components/galleryPage/Sports';
import Travel from '../components/galleryPage/Travel';
import Galaxy from '../components/galleryPage/Galaxy';
import SinglePage from '../components/SinglePage';
import Login from '../components/registerPage/Login';
import Signup from '../components/registerPage/Signup';
import Profile from '../components/Profile';
import NewPost from '../components/NewPost';
import EditPost from '../components/EditPost';
import NotFound from '../components/NotFound';
import Dashboard from '../components/admin/Dashboard';
import ForgotPassword from '../components/registerPage/ForgotPassword';
import SendPasswordEmail from '../components/registerPage/SendPasswordEmail';
import ChangePassword from '../components/common/ChangePassword';

const Photosen = () => {

    //! Auth State
    const [userData, setUserData] = useState({});
    const [userLogin, setUserLogin] = useState(false);

    const [pictures, setPictures] = useState([]);

    const getPicturesApi = async () => {
        await axios.get(`${config.localDomain}/api/user/pictureList`).then(res => {
            setPictures(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const userApi = async () => {
        const userId = localStorage.getItem("userId");

        await axios.get(`${config.localDomain}/api/user/singleUser/${userId}`).then(res => {
            // console.log(res);
            setUserData(res.data);
            setUserLogin(true)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        getPicturesApi()
        if (localStorage.getItem("userId")) userApi();
    }, []);

    return (
        <userContext.Provider value={{ userData, setUserData, userLogin, setUserLogin }}>
            <pictureContext.Provider value={{ pictures, setPictures }}>
                <Routes>
                    <Route path='/dashboard' element={userData["role"] == "admin" ? <Dashboard /> : <NotFound />} />
                </Routes>
                <MainLayout>

                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/services' element={<Services />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/contact' element={<Contact />} />

                        <Route path='/gallery/' element={<Gallery pictures={pictures} />} />
                        <Route path='/gallery/nature' element={<Nature pictures={pictures.filter(item => item.category == "nature")} />} />
                        <Route path='/gallery/portrait' element={<Portrait pictures={pictures.filter(item => item.category == "portrait")} />} />
                        <Route path='/gallery/people' element={<People pictures={pictures.filter(item => item.category == "people")} />} />
                        <Route path='/gallery/architecture' element={<Architecture pictures={pictures.filter(item => item.category == "architecture")} />} />
                        <Route path='/gallery/animals' element={<Animals pictures={pictures.filter(item => item.category == "animals")} />} />
                        <Route path='/gallery/sports' element={<Sports pictures={pictures.filter(item => item.category == "sport")} />} />
                        <Route path='/gallery/travel' element={<Travel pictures={pictures.filter(item => item.category == "travel")} />} />
                        <Route path='/gallery/galaxy' element={<Galaxy pictures={pictures.filter(item => item.category == "galaxy")} />} />

                        <Route path='/picture/*' element={<SinglePage />} />

                        <Route path='/signup' element={userLogin == false ? <Signup /> : <NotFound />} />
                        <Route path='/login' element={userLogin == false ? <Login /> : <NotFound />} />
                        <Route path='/forgot-password' element={userLogin == false ? <ForgotPassword /> : <NotFound />} />
                        <Route path='/send-password-email' element={userLogin == true ? <NotFound /> : <SendPasswordEmail />} />
                        <Route path='/change-password' element={userLogin == true ? <NotFound /> : <ChangePassword />} />

                        <Route path='/profile/*' element={userLogin == false ? <Login /> : <Profile />} />
                        {/* <Route path='/new-post' element={userLogin == false ? <NewPost /> : <Login />} /> */}
                        <Route path='/new-post' element={<NewPost />} />
                        <Route path='/edit-post' element={<EditPost />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                    <ToastContainer />
                </MainLayout>
            </pictureContext.Provider>
        </userContext.Provider>
    );
}

export default Photosen;