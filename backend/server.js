const express = require('express');
const doteEnv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const winston = require('winston');
require("winston-mongodb");

//! DoteEnv Config
doteEnv.config({ path: "./config/config.env" });

//! Connect Database
connectDB()

//! Config Winston
winston.add(new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/feaneFood",
}))

const app = express().use(express.json()).use(cors());


//! Static Folder
app.use(express.static("public/pictures"))
app.use(express.static("public/profiles"))

//! Routes
app.use("/api/user", require('./routes/userRoutes'));
app.use("/api/user", require('./routes/pictureRoutes'));
app.use("/api/user", require('./routes/contactRoutes'));

//!Handle Routes Error
app.use((err, req, res, next) => {
    console.log(err);
    winston.error(err, err);
    res.status(500).send("There is a problem on the server side")
})





app.listen(process.env.PORT || 3000, err => {
    if (err) console.log(err);
    console.log(`Server Running on ${process.env.NODE_ENV} mode in port ${process.env.PORT}`);
})