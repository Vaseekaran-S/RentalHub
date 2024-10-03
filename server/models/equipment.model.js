
const mongoose = require("mongoose")

const equipmentSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    admin: {
        type: String,
        require: true
    },
    image: {
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
    rate: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    map: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false
    },
    specifications: Array,
    impressions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const EquipmentModel = mongoose.model("equipment", equipmentSchema)

module.exports = EquipmentModel