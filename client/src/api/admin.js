
import { getAdminEmail } from "utils/getData"
import axios from "./axios"

// Create admin at singup request
export const adminSignUp = async(data) => {
    try{
        const responce = await axios.post("/admin/signup", {
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

// Login
const adminLogin = async (email, password) => {
    try {
        const response = await axios.post("/admin/login", { email, password })
        const { data } = response
        alert(data?.msg)
        return data || {}
    } catch (err) {
        return {}
    }
}

// Verify
const verifyAdminToken = async (token) => {
    try {
        const response = await axios.post("/admin/verify", { token })
        const { data } = response
        return data?.isVerified
    } catch (err) {
        return false
    }
}

// Get Admin Data
const getAdminProfileData = async () => {
    try {
        const adminEmail = getAdminEmail()
        const response = await axios.get(`/admin/${adminEmail}`)
        const { data } = response
        return (data?.status === 200)? data?.data : {}
    } catch (err) {
        return {}
    }
}

// Update Admin Data
const updateAdminData = async (newdata) => {
    try {
        const adminEmail = getAdminEmail()
        const response = await axios.put(`/admin/${adminEmail}`, { ...newdata })
        const { data } = response
        return (data?.status === 200)? data : {}
    } catch (err) {
        return {}
    }
}

export {
    adminLogin,
    verifyAdminToken,
    getAdminProfileData,
    updateAdminData
}