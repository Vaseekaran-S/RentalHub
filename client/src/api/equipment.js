import { getAdminEmail } from "utils/getData";
import axios from "./axios";

// Image Upload
const imageUpload = async (file, imagePath) => {
    try {
        const fileData = new FormData();
        fileData.append("image", file);
        fileData.append("path", imagePath);

        const request = await axios.post('/upload/image', fileData);
        const response = await request.data;

        return { status: 200, image: response?.imageUrl } || response
    } catch (err) {
        return { status: 403, message: err.message }
    }
}


// Create a Equipment
const createEquipment = async (data) => {
    try {
        const adminMail = getAdminEmail();
        const response = await axios.post("/equipments", { ...data, admin: adminMail })
        console.log(response);
        return response?.data;
    } catch (err) {
        console.log(err);
        return "Network Error"
    }
}

// Get Equipments count by Admin Email
const getEquipmentsSize = async() => {
    try {
        const adminMail = getAdminEmail()
        const { data } = await axios.get(`/equipments/${adminMail}/length`)
        if (data?.error) return 0;
        return data || 0;
    } catch (err) {
        console.log(err);
        return "Network Error"
    }
}

// Get all Equipments by admin mail
const getEquipments = async () => {
    try {
        const adminMail = getAdminEmail()
        const response = await axios.get(`/equipments/${adminMail}`)
        console.log(response);
        if (response?.data?.error) return []
        return response?.data
    } catch (err) {
        console.log(err);
        return "Network Error"
    }
}

// Get a Equipment by Id
const getEquipmentById = async (_id) => {
    try {
        const response = await axios.get(`/equipments/admin/${_id}`)
        return response?.data
    } catch (err) {
        console.log(err);
        return "Network Error"
    }
}


// Get a Equipment By Url For Client
const getEquipmentByUrl = async (url, token) => {
    try {
        const response = await axios.get(`/equipments/url/${url}`)
        console.log(response);
        return response?.data
    } catch (err) {
        alert("Network Error")
        return {}
    }
}

// Update a Equipment
const updateEquipment = async (data) => {
    try {
        const response = await axios.put(`/equipments/${data?._id}`, { ...data })
        return response?.data
    } catch (err) {
        return "Network Error"
    }
}

// Delete a Equipment
const deleteEquipment = async (_id) => {
    try {
        const response = await axios.delete(`/equipments/${_id}`)
        return response?.data
    } catch (err) {
        return "Network Error"
    }
}

export {
    imageUpload,
    createEquipment,
    getEquipmentById,
    getEquipmentByUrl,
    getEquipmentsSize,
    getEquipments,
    updateEquipment,
    deleteEquipment
}