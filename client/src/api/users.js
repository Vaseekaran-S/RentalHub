
import axios from "./axios"

// Create user at singup request
export const signUp = async(data) => {
    try{
        const responce = await axios.post("/users/signup", {
            email: data?.email,
            name: data?.name,
            mobile: data?.mobile,
            password: data?.password,
        })
        return responce.data
    }catch(err){
        return { status: 400}
    }
}

// Verify user data at login request
export const logIn = async(data) => {
    try{
        console.log(data);
        const responce = await axios.post("/users/login",{
            email: data?.email,
            password: data?.password
        })
        console.log(responce);
        return responce.data
    }catch(err){
        return { status: 400}
    }
}


// Vadilate user token
export const verifyUserToken = async() => {
    try{
        const token = localStorage.getItem("real-estate-user")
        if(!token){
            return false
        }
        const response = await axios.get("/users/token", {
            headers: {
                Authorization: token
            }
        })
        const status = (response?.data?.status === 202)? response?.data : false
        return status
    }catch(error){
        return false
    }
}

// GET : Get User Data from Db with username
export const getUser = async (username) => {
    try {
        const response = await axios.get(`/users/${username}`)
        return (response?.status === 202) ? response.data : {}
    } catch (err) {
        console.log(err);
        return {}
    }
}


// PUT : Update User Data 
export const updateUser = async (username, data) => {
    try {
        const response = await axios.put(`/users/${username}`, { ...data })
        return (response?.status === 200) ? response.data : {}
    } catch (err) {
        console.log(err);
        return {}
    }
}