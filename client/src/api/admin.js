
import axios from "./axios"

// Login
const adminLogin = async (username, password) => {
    try {
        const response = await axios.post("/admin/login", { username, password })
        const { data } = response
        alert(data?.msg)
        return (data?.status === 200)? data : {}
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
        const response = await axios.get("/admin/66a741dd6e32f53636dd5dec")
        const { data } = response
        return (data?.status === 200)? data?.data : {}
    } catch (err) {
        return {}
    }
}

// Update Admin Data
const updateAdminData = async (newdata) => {
    try {
        const response = await axios.put("/admin/66a741dd6e32f53636dd5dec", { ...newdata })
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