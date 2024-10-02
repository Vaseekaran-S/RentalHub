import { getAdminEmail } from "utils/getData";
import axios from "./axios";

// Image Upload
const imageUpload = async (file, imagePath) =>{
        try{    
            const fileData = new FormData();
            fileData.append("image", file);
            fileData.append("path", imagePath);
        
            const request = await axios.post('/upload/image', fileData);
            const response = await request.data;
            
            return { status: 200, image: response?.imageUrl } || response
        }catch(err){
            return { status: 403, message: err.message }
        }
    }

    
// Create a Equipment
const createEquipment = async(data) => {
    try{
        const adminMail = getAdminEmail();
        const response = await axios.post("/equipment", { ...data, admin: adminMail })
        console.log(response);
        return response?.data;
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}

// Get a Equipments
const getEquipments = async() => {
    try{
        const adminMail = getAdminEmail()
        const response = await axios.get(`/equipment/${adminMail}`)
        console.log(response);
        if(response?.data?.error) return []
        return response?.data
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}

// Get a Equipment
const getEquipment = async(url) => {
    try{
        const response = await axios.get(`/equipment/${url}`)
        return response?.data
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}


// Get a Equipment By Url For Client
const getEquipmentByUrl = async(url, token) => {
    try{
        const response = await axios.get(`/equipment/url/${url}`)
        console.log(response);
        return response?.data
    }catch(err){
        alert("Network Error")
        return {}
    }
}

// Update a Equipment
const updateEquipment = async(data) => {
    try{
        const response = await axios.put(`/equipment/${data?._id}`, { ...data })
        return response?.data
    }catch(err){
        return "Network Error"
    }
}

// Delete a Equipment
const deleteEquipment = async(_id) => {
    try{
        const response = await axios.delete(`/equipment/${_id}`)
        return response?.data
    }catch(err){
        return "Network Error"
    }
}

export {
    imageUpload,
    createEquipment,
    getEquipment,
    getEquipmentByUrl,
    getEquipments,
    updateEquipment,
    deleteEquipment
}