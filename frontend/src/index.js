import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './container/App';

import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import "sweetalert2/dist/sweetalert2.min.css";

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));