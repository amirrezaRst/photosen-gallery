const { isValidObjectId } = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const { userModel } = require("../model/userModel")
const { loginValidation, registerValidation, newUserValidation, passwordValidation, forgotValidation } = require("./validation/userValidation");




//! Get Request
exports.userList = async (req, res) => {
    const allUser = await userModel.find()
    res.send(allUser)
}

exports.singleUser = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const targetUser = await userModel.findById(req.params.id).populate("gallery follow")
    if (!targetUser) return res.status(404).send("user not found!")
    res.send(targetUser)
}
exports.userProfile = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const targetUser = await userModel.findById(req.params.id).populate("gallery follow").select("-password -role")
    if (!targetUser) return res.status(404).send("user not found!")
    res.send(targetUser)
}



//! Post Request
exports.register = async (req, res) => {
    if (registerValidation(req.body).error) return res.status(422).send(registerValidation(req.body).error.message);

    const newUser = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        profileImage: req.file
    })
    if (req.file == undefined) {
        newUser.profileImage = "user-profile.jpg"
    } else {
        newUser.profileImage = req.file.filename
    }
    newUser.save()
    console.log(req.file);
    res.status(201).send(newUser);
}

exports.login = async (req, res) => {
    if (loginValidation(req.body).error) return res.status(422).send(loginValidation(req.body).error.message);

    // const targetUser = await userModel.findById(req.params.id).populate("gallery")
    const user = await userModel.findOne({ email: req.body.email }).populate("gallery follow")
    if (!user) return res.status(422).send("User with this email was not found");
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) return res.status(422).send("Email or password is not correct!");

    const tokenData = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    res.header("Access-Control-Expose-headers", "x-auth-token").header("x-auth-token", token).json({ user, text: "login successfully" });
}


exports.addFollow = async (req, res) => {
    const schema = Joi.object({
        followId: Joi.string().required()
    })
    if (schema.validate(req.body).error) return res.status(402).send(schema.validate(req.body).error.message);

    const user = await userModel.findById(req.params.id);
    var findUserFollow;

    findUserFollow = user.follow.findIndex(item => {
        return item == req.body.followId
    })
    if (findUserFollow > -1) { }
    else {
        user.follow.push(req.body.followId);
    }

    user.save();
    res.json({ text: "user follow", user });
}

exports.removeFollow = async (req, res) => {
    const schema = Joi.object({
        followId: Joi.string().required()
    })
    if (schema.validate(req.body).error) return res.status(402).send(schema.validate(req.body).error.message);

    const user = await userModel.findById(req.params.id);

    const followIndex = user.follow.indexOf(req.body.followId)
    if (followIndex > -1) {
        user.follow.splice(followIndex, 1);
    }
    else {
        res.status(204).send("user follow not found");
    }

    user.save();
    res.json({ text: "remove follow", user })
}

exports.newUser = async (req, res) => {
    if (newUserValidation(req.body).error) return res.status(422).send(newUserValidation(req.body).error.message);

    const newUser = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        profileImage: req.file
    })
    if (req.file == undefined) {
        newUser.profileImage = "user-profile.jpg"
    } else {
        newUser.profileImage = req.file.filename
    }
    newUser.save()
    console.log(req.file);
    res.status(201).send(newUser);
}


exports.forgotPassword = async (req, res) => {
    if (forgotValidation(req.body).error) return res.status(422).send(forgotValidation(req.body).error.message);

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "amirreza.rostami.0073@gmail.com",
            pass: "amirreza.rostami.152062002020"
        }
    })

    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
        const tokenData = {
            userId: user._id
        }
        var token = jwt.sign(tokenData, process.env.JWT_SECRET);
    }

    var mailOptions = {
        from: "amirreza.rostami.0073@gmail.com",
        to: req.body.email,
        subject: "Change Password",
        html: `<h2>To change your password on the photosen site, enter the link</h2> <h4><a href="http://localhost:3001/change-password/${token}">Change Password</a></h4>`
    }

    transport.sendMail(mailOptions, err => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: "message sent" });
    });
}


//! Put Request
exports.changePassword = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(400).send("user not found");

    if (passwordValidation(req.body).error) return res.status(422).send(passwordValidation(req.body).error.message);

    if (req.body.password !== req.body.confirmPassword) return res.status(422).send("Password and confirm password are different");

    user.password = bcrypt.hashSync(req.body.password, 10);

    user.save();
    res.send("password changed");
}


//! Delete Request
exports.deleteUser = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid!");

    const user = await userModel.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("user not found!")

    res.status(200).send("user deleted");
}