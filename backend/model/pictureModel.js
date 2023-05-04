const mongoose = require('mongoose');


const pictureSchema = mongoose.Schema({
    picAddress: { type: String, require: true },
    subtitle: { type: String, require: true },
    category: { type: String, require: true, enum: ["nature", "portrait", "animals", "travel", "architecture", "people", "galaxy", "sport"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // like: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }]
    like: { type: Number, default: 0 }
})

exports.pictureModel = mongoose.model("pictures", pictureSchema);