const jwt = require("jsonwebtoken")
const AdminModel = require("../models/admin.model")

const defaultSecretKey = "admin-token-provider";
// Create a Jwt Token
const createJwtToken = ( payload, secretKey = defaultSecretKey, expiresIn = "12h") => {
    return jwt.sign({payload}, secretKey, { expiresIn: expiresIn } )
}

// Verify a JWT Token
const verifyJwtToken = ( token, secretKey = defaultSecretKey ) => {
    try{
        return jwt.verify(token, secretKey)
    }catch(err){
        return false
    }
}

// Amdin Login
const adminLogin = (req, res) => {
    const { username, password } = req.body;
    if (username != "admin" || password != "admin@123") {
        return res.json({ msg: "Username or Password is Incorrect", status: 401 });
    }
    const token = createJwtToken(username)
    res.status(200).json({ msg: "Admin Verified", token: token, status: 200 })
}

// Verify Admin
const verifyAdminToken = (req, res) => {
    const { token } = req.body;
    console.log(token);
    if (!token) return res.json({ msg: "Token is not in the request body!", status: 400 })
    const isVerified = verifyJwtToken(token)
    console.log(isVerified);
    if (isVerified)
        res.json({ msg: "Admin Verified", isVerified: true, status: 200 })
    else
        res.json({ msg: "Admin Not Verified", isVerified: false, status: 409 })
}

// Get Admin Profile
const getAdminProfile = async(req, res) => {
    const { adminId } = req.params;
    if (!adminId) return res.json({ msg: "User Id not Found in params!", status: 400 })
    const data = await AdminModel.findOne({ _id: adminId, isDeleted: false })
    if (data)
        res.json({ msg: "Admin Exists", data, status: 200 })
    else
        res.json({ msg: "Admin Not Exists", status: 409 })
}

// Create a Admin
const createAdmin = async(req, res) => {
    try{
        const { name, description, mobile, email, role, location } = req.body;
        if(!name || !description || !mobile || !email || !role || !location){
            return res.json({ msg: "All data are Requiered" })
        }
        const response = await AdminModel.create({...req.body})
        res.json({ msg: "Admin Created!", data: response, status: 200 })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }

}

// Update a Admin
const updateAdmin = async(req, res) => {
    try{
        const { adminId } = req.params;
        if (!adminId) return res.json({ msg: "User Id not Found in params!", status: 400 })
        const data = await AdminModel.updateOne({ _id: adminId, isDeleted: false }, { $set: req.body })
        res.json({ msg: "Admin Updated!", data, status: 200 })
    }catch(err){
        console.log(err?.message);
        res.json({ msg: "Server Error", error: err?.message })
    }
}


module.exports = {
    adminLogin,
    verifyAdminToken,
    getAdminProfile,
    createAdmin,
    updateAdmin
}