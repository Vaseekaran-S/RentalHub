const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const AdminModel = require("../models/admin.model")

const defaultSecretKey = "admin-token-provider";
// Create a Jwt Token
const createJwtToken = (payload, secretKey = defaultSecretKey, expiresIn = "12h") => {
    return jwt.sign({ payload }, secretKey, { expiresIn: expiresIn })
}

// Verify a JWT Token
const verifyJwtToken = (token, secretKey = defaultSecretKey) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (err) {
        return false
    }
}

// Create a encrypted password
const saltRounds = 10
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (err) {
        throw err
    }
}

// POST : Create Admin at DB with enscrypted password
const createNewAdmin = async (req, res) => {
    const { password, mobile, name, email } = req.body
    if (!password || !mobile || !name || !email) return res.status(400).json({ msg: "Please! Enter all Details", status: 400 })

    try {
        const isAdminExist = await AdminModel.findOne({ email: email })
        if (isAdminExist) {
            return res.send({ msg: "Email already taken!", status: 302 })
        }
        const encryptedPassword = await hashPassword(password)

        const admin = new AdminModel({ mobile: mobile, password: encryptedPassword, name: name, email: email })
        await admin.save().then(data => {
            const token = createJwtToken(email)
            res.json({ msg: "Admin Succesfully Created!", status: 202, token: token, email: email })
        }).catch(err => {
            console.error(err);
            res.json({ msg: err?.message })
        })
    } catch (err) {
        console.error(err.message)
        res.json({ msg: "Something went Wrong at Server!", status: 500, err: err.message })
    }
}

// Admin Login
const adminLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const admin = await AdminModel.findOne({ email: email })
        if (!admin) {
            return res.json({ msg: "Admin not Found!", status: 404 })
        }
        const isValid = await verifyHashPassword(password, admin?.password)
        if (isValid) {
            const token = createJwtToken(email)
            res.json({ msg: "Admin Authentication Matched!", status: 202, token: token, email: email })
        } else {
            res.json({ msg: "Admin Authentication Failed!", status: 406 })
        }
    } catch (err) {
        res.json({ type: "error", msg: err?.message, status: 406 })
    }

}

// Verify Admin
const verifyAdminToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.json({ msg: "Token is not in the request body!", status: 400 })
    const isVerified = verifyJwtToken(token);
    if (isVerified)
        res.json({ msg: "Admin Verified", isVerified: true, status: 200 })
    else
        res.json({ msg: "Admin Not Verified", isVerified: false, status: 409 })
}

// Get Admin Profile
const getAdminProfile = async (req, res) => {
    const { adminEmail } = req.params;
    if (!adminEmail) return res.json({ msg: "User Id not Found in params!", status: 400 })
    const data = await AdminModel.findOne({ email: adminEmail, isDeleted: false })
    if (data)
        res.json({ msg: "Admin Exists", data, status: 200 })
    else
        res.json({ msg: "Admin Not Exists", status: 409 })
}

// Create a Admin
const createAdmin = async (req, res) => {
    try {
        const { name, description, mobile, email, role, location } = req.body;
        if (!name || !description || !mobile || !email || !role || !location) {
            return res.json({ msg: "All data are Requiered" })
        }
        const response = await AdminModel.create({ ...req.body })
        res.json({ msg: "Admin Created!", data: response, status: 200 })
    } catch (err) {
        res.json({ msg: "Server Error", error: err?.message })
    }

}

// Update a Admin
const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        if (!adminId) return res.json({ msg: "User Id not Found in params!", status: 400 })
        const data = await AdminModel.updateOne({ _id: adminId, isDeleted: false }, { $set: req.body })
        res.json({ msg: "Admin Updated!", data, status: 200 })
    } catch (err) {
        console.log(err?.message);
        res.json({ msg: "Server Error", error: err?.message })
    }
}


module.exports = {
    createNewAdmin,
    adminLogin,
    verifyAdminToken,
    getAdminProfile,
    createAdmin,
    updateAdmin
}