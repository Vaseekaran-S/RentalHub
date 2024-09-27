
const mongoose = require("mongoose")

const users = new mongoose.Schema({
    mobile: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false
    },
    profileImage: {
        type: String
    },
    location: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: true
    }
},{
    timestamps: true
})

const Users = mongoose.model("users", users);
module.exports = Users