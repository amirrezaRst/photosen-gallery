const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullName: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, uniq: true },
    password: { type: String, require: true, trim: true, minlength: 5, maxlength: 255 },
    profileImage: { type: String },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "pictures" }],
    follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    role: { type: String, enum: ["user", "admin"], default: "user" }
})

exports.userModel = mongoose.model("users", userSchema);