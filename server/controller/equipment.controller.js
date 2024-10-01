
const EquipmentModel = require("../models/equipment.model");

// Create a Equipment
const createEquipment = async(req, res) => {
    try{
        const { name, description, price, type, location } = req.body;
        if(!name || !description || !price || !type || !location){
            return res.json({ msg: "All data are Requiered" })
        }
        const response = await EquipmentModel.create({...req.body})
        res.json({ msg: "Equipment Created!", data: response, status: 200 })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }

}

// Get a Equipments
const getEquipments = async(req, res) => {
    try{
        const data = await EquipmentModel.find({ isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Get a Equipment
const getEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.findOne({ _id: req.params?.url, isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Get a Equipment By Dynamic Url
const getEquipmentByUrl = async(req, res) => {
    try{
        const data = await EquipmentModel.findOne({ url: req.params?.url, isDeleted: false }).select('name description image url location type price amenities map _id')
        await EquipmentModel.updateOne({ url: req.params?.url, isDeleted: false }, { $inc: { impressions: 1 } } )
        console.log(data);
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Update a Equipment
const updateEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.updateOne({ _id: req.params?.url, isDeleted: false }, { $set: req.body })
        res.json({ msg: "Equipment Updated!", data, status: 200 })
    }catch(err){
        console.log(err?.message);
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Soft Delete a Equipment
const softDeleteEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.updateOne({ _id: req?.params?.url }, { isDeleted: true })
        res.json({ msg: "Document Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Delete all Equipment
const deleteAllEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.deleteMany()
        res.json({ msg: "Db Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

module.exports = {
    createEquipment,
    getEquipment,
    getEquipments,
    deleteAllEquipment,
    softDeleteEquipment,
    updateEquipment,
    getEquipmentByUrl
}