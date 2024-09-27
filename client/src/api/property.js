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

    
// Create a Property
const createProperty = async(data) => {
    try{ 
        const response = await axios.post("/property", { ...data })
        console.log(response);
        return response?.data;
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}

// Get a Properties
const getProperties = async() => {
    try{
        const response = await axios.get("/property")
        console.log(response);
        if(response?.data?.error) return []
        return response?.data
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}

// Get a Property
const getProperty = async(url) => {
    try{
        const response = await axios.get(`/property/${url}`)
        return response?.data
    }catch(err){
        console.log(err);
        return "Network Error"
    }
}


// Get a Property By Url For Client
const getPropertyByUrl = async(url, token) => {
    try{
        const response = await axios.get(`/property/url/${url}`)
        console.log(response);
        return response?.data
    }catch(err){
        alert("Network Error")
        return {}
    }
}

// Update a Property
const updateProperty = async(data) => {
    try{
        const response = await axios.put(`/property/${data?._id}`, { ...data })
        return response?.data
    }catch(err){
        return "Network Error"
    }
}

// Delete a Property
const deleteProperty = async(_id) => {
    try{
        const response = await axios.delete(`/property/${_id}`)
        return response?.data
    }catch(err){
        return "Network Error"
    }
}

export {
    imageUpload,
    createProperty,
    getProperty,
    getPropertyByUrl,
    getProperties,
    updateProperty,
    deleteProperty
}