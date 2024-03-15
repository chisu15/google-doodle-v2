const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    status: String,
    timeDoodleStart: Date,
    timeDoodleEnd: Date,
    favorite: [{
        doodle_id: mongoose.Schema.Types.ObjectId
    }],
    doodleCreated: [{
        doodle_id: mongoose.Schema.Types.ObjectId
    }],
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

const Users = mongoose.model("user", userSchema, "users");
module.exports = Users;