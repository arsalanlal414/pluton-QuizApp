const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "provide correct username"],
    },
    email:{
        type: String,
        required:[true, "provide correct email address"],
        unique: [true,"emsil slready exists"]
    },
    password:{
        type: String,
        required: [true, "provide correct password"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("admin", adminSchema)