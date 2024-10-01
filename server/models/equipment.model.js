
const mongoose = require("mongoose")

const propertySchema = mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name: {
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
    price: {
        type: String,
        require: true
    },
    type: {
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
    amenities: Array,
    impressions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const PropertyModel = mongoose.model("property", propertySchema)

module.exports = PropertyModel