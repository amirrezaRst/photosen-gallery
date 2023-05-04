const { isValidObjectId } = require("mongoose");
const { contactModel } = require("../model/contactModel")
const { newContactValidation } = require('./validation/contactValidation');


//! Get Request
exports.contactList = async (req, res) => {
    const contact = await contactModel.find();
    res.send(contact);
};

exports.answered = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(422).send("id is not valid");

    const contact = await contactModel.findById(req.params.id);
    if (!contact) return res.status(422).send("contact not found");

    contact.answering = true
    await contact.save();

    const allContact = await contactModel.find();

    res.status(201).json({ text: "contact answered", allContact });
}


//! Post Request
exports.newContact = async (req, res) => {
    if (newContactValidation(req.body).error) return res.status(422).send(newContactValidation(req.body).error.message);

    const newContact = new contactModel({
        fullName: req.body.fullName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    await newContact.save();
    res.status(201).json({ text: "contact created", contact: newContact });
}



//! Delete Request
exports.deleteContact = async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(422).send("id is not valid");

    const contact = await contactModel.findByIdAndRemove(req.params.id);
    if (!contact) return res.status(422).send("contact not found");

    const allContact = await contactModel.find();

    res.json({ text: "contact deleted", contacts: allContact });
}