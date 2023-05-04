const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    subject: { type: String, require: true },
    message: { type: String, require: true },
    answering: { type: Boolean, default: "false" }
})
exports.contactModel = mongoose.model("contacts", contactSchema);