const express = require("express")
const router = express.Router()

const { registerAdmin, loginAdmin, CurrentAdmin } = require("../controllers/adminControllers")
const validateToken = require("../middleWare/validateTokenHandler")

router.post("/register",registerAdmin)
router.post("/login", loginAdmin)
router.get("/current", validateToken, CurrentAdmin)

module.exports = router