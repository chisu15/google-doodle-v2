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
        type: String
    }],
    doodleCreated: [{
        type: String
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