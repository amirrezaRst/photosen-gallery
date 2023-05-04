const fs = require('fs');
const path = require('path');

const { isValidObjectId } = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const shortid = require('shortid');

const { pictureModel } = require("../model/pictureModel");
const { userModel } = require('../model/userModel');
const { createValidation, editValidation } = require("./validation/pictureValidation");



//! Get Request
exports.pictureList = async (req, res) => {
    const pictures = await pictureModel.find().populate("user", "-password -gallery -role");
    res.send(pictures);
}

exports.singlePicture = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const picture = await pictureModel.findById(req.params.id).populate("user like", "-password -gallery -role");
    if (!picture) return res.status(404).send("picture not found!");

    res.send(picture);
}

exports.like = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const picture = await pictureModel.findById(req.params.id).select("like");
    if (!picture) return res.status(404).send("picture not found!");

    picture.like += 1
    picture.save();

    res.send(picture)
}
exports.dislike = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const picture = await pictureModel.findById(req.params.id).select("like");
    if (!picture) return res.status(404).send("picture not found!");

    picture.like -= 1
    picture.save();

    res.send(picture)
}
exports.download = async (req, res) => {
    const file = path.join(__dirname, "../", "public", "pictures", req.params.id)
    // const file = path.join(__dirname, "../", "public", "pictures", "_j4MBqdKc_portrait_2.jpg")
    
    res.download(file)
}


//! Post Request
exports.createPicture = async (req, res) => {
    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else if (file.mimetype == "image/jpg") {
            cb(null, true);
        }
        else {
            cb("The file extension must be jpg or jpeg", false);
        }
    };

    const upload = multer({
        limits: { fileSize: 20000000 },
        fileFilter: fileFilter,
    }).single("picture");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(400)
                    .send("The size of the photo should not be more than 20 MB");
            }
            res.status(400).send(err);
        } else {
            // console.log(req);
            if (req.file) {
                const fileName = `${shortid.generate()}_${req.file.originalname
                    }`;
                await sharp(req.file.buffer)
                    .jpeg({
                        quality: 70,
                    })
                    .resize(900, 750)
                    .toFile(`./public/pictures/${fileName}`)
                    .catch((err) => console.log(err));

                if (createValidation(req.body).error) return res.status(422).send(createValidation(req.body).error.message);

                const targetUser = await userModel.findById(req.body.user);
                if (!targetUser) return res.status(422).send("user not found");

                const newPicture = new pictureModel({
                    subtitle: req.body.subtitle,
                    user: req.body.user,
                    category: req.body.category
                })

                newPicture.picAddress = fileName;
                // newPicture.like.push(req.body.like)
                targetUser.gallery.push(newPicture);

                await newPicture.save()
                await targetUser.save()

                res.status(201).json({ message: "picture created", picture: newPicture });
            } else {
                res.status(400).send("picture field is required");
            }
        }
    });
}



//! Put Request
exports.editPicture = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else if (file.mimetype == "image/jpg") {
            cb(null, true);
        }
        else {
            cb("The file extension must be jpg or jpeg", false);
        }
    };

    const upload = multer({
        limits: { fileSize: 20000000 },
        fileFilter: fileFilter,
    }).single("picture");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(400)
                    .send("The size of the photo should not be more than 20 MB");
            }
            res.status(400).send(err);
        } else {
            if (req.file) {
                const fileName = `${shortid.generate()}_${req.file.originalname}`;
                await sharp(req.file.buffer)
                    .jpeg({
                        quality: 70,
                    })
                    .resize(900, 750)
                    .toFile(`./public/pictures/${fileName}`)
                    .catch((err) => console.log(err));

                if (editValidation(req.body.formData).error) return res.status(422).send(editValidation(req.body.formData).error.message);

                const picture = await pictureModel.findById(req.params.id);
                if (!picture) return res.status(400).send("picture is not found");

                fs.unlink(path.join(__dirname, '..', "public", "pictures/") + picture.picAddress, (err) => {
                    if (err) {
                        throw err;
                    }
                });

                picture.subtitle = req.body.subtitle;
                picture.category = req.body.category;
                picture.picAddress = fileName;

                picture.save();

                res.status(201).json({ message: "picture edited", picture });
            } else {
                if (editValidation(req.body.formData).error) return res.status(422).send(editValidation(req.body.formData).error.message);

                const picture = await pictureModel.findById(req.params.id);
                if (!picture) return res.status(400).send("picture is not found");

                picture.subtitle = req.body.subtitle;
                picture.category = req.body.category;

                // picture.save();

                res.status(201).json({ message: "picture edited without image", picture });
            }
        }
    });
}


//! Delete Request
exports.deletePicture = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("id is not valid");

    const picture = await pictureModel.findByIdAndRemove(req.params.id);
    if (!picture) return res.status(404).send("picture not found");
    const user = await userModel.findById(picture.user);

    fs.unlink(path.join(__dirname, '..', "public", "pictures/") + picture.picAddress, (err) => {
        if (err) {
            throw err;
        }
    });

    const postIndex = user.gallery.indexOf(req.params.id)
    if (postIndex > -1) {
        user.gallery.splice(postIndex, 1);
    }
    else {
        res.status(204).send("user post not found")
    }
    user.save();

    res.json({ text: "post deleted" })
}