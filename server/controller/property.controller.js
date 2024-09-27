
const PropertyModel = require("../models/property.model");

// Create a Property
const createProperty = async(req, res) => {
    try{
        const { name, description, price, type, location } = req.body;
        if(!name || !description || !price || !type || !location){
            return res.json({ msg: "All data are Requiered" })
        }
        const response = await PropertyModel.create({...req.body})
        res.json({ msg: "Property Created!", data: response, status: 200 })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }

}

// Get a Properties
const getProperties = async(req, res) => {
    try{
        const data = await PropertyModel.find({ isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Get a Property
const getProperty = async(req, res) => {
    try{
        const data = await PropertyModel.findOne({ _id: req.params?.url, isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Get a Property By Dynamic Url
const getPropertyByUrl = async(req, res) => {
    try{
        const data = await PropertyModel.findOne({ url: req.params?.url, isDeleted: false }).select('name description image url location type price amenities map _id')
        await PropertyModel.updateOne({ url: req.params?.url, isDeleted: false }, { $inc: { impressions: 1 } } )
        console.log(data);
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Update a Property
const updateProperty = async(req, res) => {
    try{
        const data = await PropertyModel.updateOne({ _id: req.params?.url, isDeleted: false }, { $set: req.body })
        res.json({ msg: "Property Updated!", data, status: 200 })
    }catch(err){
        console.log(err?.message);
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Soft Delete a Property
const softDeleteProperty = async(req, res) => {
    try{
        const data = await PropertyModel.updateOne({ _id: req?.params?.url }, { isDeleted: true })
        res.json({ msg: "Document Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Delete all Property
const deleteAllProperty = async(req, res) => {
    try{
        const data = await PropertyModel.deleteMany()
        res.json({ msg: "Db Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

module.exports = {
    createProperty,
    getProperty,
    getProperties,
    deleteAllProperty,
    softDeleteProperty,
    updateProperty,
    getPropertyByUrl
}