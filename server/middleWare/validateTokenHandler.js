const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async (req, res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if( authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1]  // the first value is Bearer and the second value is token which we are getting here

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if(err){
                res.status(401)
                throw new Error("User is not authorized")
            }
            req.user = decoded.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("user not authorize or token is not valid")
        }
    }
})

module.exports = validateToken