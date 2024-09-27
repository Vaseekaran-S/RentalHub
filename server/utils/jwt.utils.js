const jwt = require("jsonwebtoken")
const secretKey = "space-y-token-provider"

const verifyJwtToken = (token) => {
    if(!token){
        return { msg: "User Authentication Failed!", status: 401}
    }
    try{
        const verification = jwt.verify(token, secretKey)
        return { msg: "User Authenticated!", status: 202, user: verification}
    }catch(err){
        return { msg: "User Authenticated Failed!", status: 401}
    }
}

module.exports = {
    verifyJwtToken
}