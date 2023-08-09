const express = require("express")
const router = express.Router()
const User = require("../models/userModel")

const {getUser, deleteUser,updateUser, registerUser, loginUser, CurrentUser } = require("../controllers/userControllers")
const validateToken = require("../middleWare/validateTokenHandler")

router.post("/register",registerUser )
router.post("/login", loginUser)
router.get('/', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.get("/current", validateToken, CurrentUser)

module.exports = router