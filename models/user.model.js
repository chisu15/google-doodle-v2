const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    status: String,
    favorite: [{
        doodle_id: String,
        ref: 'doodles'
    }],
    doodleCreated: [{
        doodle_id: String,
        ref: 'doodles'
    }]
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;