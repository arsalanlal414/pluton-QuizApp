const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler") // it removes the try catch block and detects error by itself
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");


// @desc register user
// @Route /api/user/register
// @access public
const registerUser = asyncHandler( async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mendatory")
    }

    const availableUser = await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
   
    const user = await User.create({
        username, 
        email, 
        password: hashedPassword
    })
    res.status(201).json({_id: user.id, email});
})

// @desc login user
// @Route /api/user/login
// @access public
const loginUser = asyncHandler( async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mendatory")
    }

    const user = await User.findOne({email})
    
    // comparing hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
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

// @desc current user info
// @Route /api/user/current
// @access private
const CurrentUser = asyncHandler(async(req, res)=>{
    const user = req.user
    res.json(user)
})


// @desc get user
// @Route /api/user
// @access public
const getUser = asyncHandler(async (req,res)=>{
    const users = await User.find()
    if(users){
        res.status(200).json(users)
    }
})


// @desc update user
// @Route /api/user/:id
// @access public
const updateUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404);
        throw new Error("user  not found")
    }

    const newUser = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    res.status(200).json(newUser)
})


// @desc delete user
// @Route /api/user/:id
// @access public
const deleteUser = asyncHandler(async (req,res)=>{
    // const {userId} = req.body
    const user = await User.findById(req.params.id)
    if(!user){
        console.log("inside not statement")
        res.status(404);
        throw new Error("user  not found")
    }

    const result  = await User.deleteOne({ _id: req.params.id })
    res.status(200).json(user)
})

module.exports = { getUser, updateUser, deleteUser, registerUser, loginUser, CurrentUser}