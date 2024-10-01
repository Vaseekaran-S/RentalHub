
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false
    }
}, { 
    timestamps: true
})

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel