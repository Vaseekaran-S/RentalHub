const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/users.model")

// Create JWT token
const secretKey = "space-y-token-provider"
const getJwtToken = (username) => {
    const token = jwt.sign({username}, secretKey, {expiresIn: "24h"})
    return token
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

// Verify encrypted password
const verifyHashPassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (err) {
        throw err
    }
}


// POST : Create New User at DB with enscrypted password
const createNewUser = async (req, res) => {
    console.log(req.body);
    const { password, mobile, name, email } = req.body
    if( !password || !mobile || !name || !email){
        console.log("Please! Enter all Details");
        return res.status(400).json({ msg: "Please! Enter all Details", status: 400 })
    }
    try {
        const isUserExist = await User.findOne({ email: email })
        if (isUserExist) {
            return res.send({ msg: "Email already taken!", status: 302 })
        }
        const encryptedPassword = await hashPassword(password)
            
        const user = new User({ mobile: mobile, password: encryptedPassword, name: name, email: email })
        await user.save().then(data => {
            const token = getJwtToken(email)
            res.json({ msg: "User Succesfully Created!", status: 202, token: token, email: email })
        }).catch(err => {
            console.error(err);
            res.json({ msg: err?.message })
        })
    } catch (err) {
        console.error(err.message)
        res.json({ msg: "Something went Wrong at Server!", status: 500, err: err.message })
    }
}


// POST : Verify the email and passowrd
const verifyUser = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.json({ msg: "User not Found!", status: 404 })
            return
        }
        const isValid = await verifyHashPassword(password, user?.password)
        if (isValid) {
            const token = getJwtToken(email)
            res.json({ msg: "User Authentication Matched!", status: 202, token: token, email: email })
        } else {
            res.json({ msg: "User Authentication Failed!", status: 406 })
        }

    } catch (err) {
        throw err
    }
}


// GET : Verifying the user header for auto authentication
const tokenValidation = (req, res) => {
    const token = req.headers.authorization;
    if(!token){
        return res.json({ msg: "User Authentication Failed!", status: 401})
    }
    try{
        const verification = jwt.verify(token, secretKey)
        console.log("Verification : ", verification);
        return res.json({ msg: "User Authenticated!", status: 202, user: verification})
    }catch(err){
        return res.json({ msg: "User Authenticated Failed!", status: 401})
    }
}


// GET : Getting all user data
const getAllUser = async(req,res) => {
    try{
        const usersData = await User.find({}).limit(2)
        if(!usersData){
            console.log("Users Not Found");
            return
        }
        console.log(usersData);
        res.json(usersData)
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: "Something went wrong at Server!", err: err.message })
    }
}


// GET : Getting user data
const getUser = async(req,res) => {
    try{
        const email = req.params?.id
        const userData = await User.findOne({ email: email}).select('-password')
        if(!userData){
            return res.json({ msg: "User Not Found!", status: 404})
        }
        
        res.status(202).json(userData)
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: "Something went wrong at Server!", err: err.message })
    }
}


// PUT : Update user data
const updateUser = async(req,res) => {
    try{
        const userName = req.params?.id
        const { username, password, email, isDeleted, ...data} = req.body
        const updateUser = await User.updateOne({ email: email }, { $set: data })
        if(updateUser.matchedCount === 0){
            return res.json({ msg: "User Not Found!", status: 404 })
        }
        res.json({ msg: "Profile Updated!", status: 202, data: data })
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: "Something went wrong at Server!", err: err.message })
    }
}


// DELETE : Delete user data
const deleteUser = async(req,res) => {
    try{
        const username = req.params?.id

        const deleteUser = await User.updateOne({ username: username}, { $set: { isDeleted: true } })
        if(deleteUser.matchedCount === 0){
            return res.status(404).json({ msg: "User Not Found!", status: 404 })
        }
        res.status(202).json({ msg: "Used Deleted!", status: 202 })
    }catch(err){
        console.log(err.message);
        res.status(500).json({ msg: "Something went wrong at Server!", err: err.message })
    }
}

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    createNewUser,
    verifyUser,
    tokenValidation
}