const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = 'your_secret_key_here';
const user = require ('../model/userSchema')


const validateToken = (async (req, res, next) => {
   console.log( req.headers.token)
    const token = req.headers.token
    if(!token) return res.status(401).json('Unauthorize user')
   try{
        const decoded = jwt.verify(token,JWT_SECRET_KEY);
        req.user = decoded
        console.log(decoded)
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
})


module.exports = validateToken;
