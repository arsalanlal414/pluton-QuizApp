const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler") // it removes the try catch block and detects error by itself
const Admin = require("../models/adminModel")
const jwt = require("jsonwebtoken");


// @desc register admin
// @Route /api/admin/register
// @access public
const registerAdmin = asyncHandler( async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mendatory")
    }

    const availableAdmin = await Admin.findOne({email});
    if(availableAdmin){
        res.status(400);
        throw new Error("email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
   
    const admin = await Admin.create({
        username, 
        email, 
        password: hashedPassword
    })
    res.status(201).json({_id: admin.id, email});
})

// @desc login admin
// @Route /api/admin/login
// @access public
const loginAdmin = asyncHandler( async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mendatory")
    }

    const admin = await Admin.findOne({email})
    
    // comparing hashed password
    if(admin && (await bcrypt.compare(password, admin.password))){
        const accessToken = jwt.sign(
            {
                admin: {
                    username: admin.username,
                    email: admin.email,
                    id: admin.id
                },
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "2h" }
        )
        res.status(201).json({accessToken})
        // console.log(user)
    } 
    else{
        res.status(400)
        throw new Error("Email or password not correct")
    }
})

// @desc current admin info
// @Route /api/admin/current
// @access private
const CurrentAdmin = asyncHandler(async(req, res)=>{
    const admin = req.admin
    res.json(admin)
})


module.exports = {registerAdmin, loginAdmin, CurrentAdmin}