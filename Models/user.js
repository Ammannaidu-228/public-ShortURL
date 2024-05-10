const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        require: true,
        default: "Normal",
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const USER = mongoose.model('user', userSchema);

module.exports = USER;