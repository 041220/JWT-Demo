const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 50,
        unique: true,
    },
    phonenumber: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 11,
        unique: true,
    },
    address: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    },
    admin: {
        type: Boolean,
        default: false,

    },
    token: {
        type: String,
        default: ''
    }
},
    { timestamps: true }
)


module.exports = mongoose.model("User", userSchema)

