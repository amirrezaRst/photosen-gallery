const mongoose = require('mongoose');


exports.commentSchema = mongoose.Schema({
    fullName: { type: String, require: true },
    message: { type: String, require: true },
    sendDate: { type: String, require: true },
    profile: { type: String, require: true }
});