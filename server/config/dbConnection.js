const mongoose = require("mongoose")
const connectDb = async () =>{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017');
        console.log("DATABASE CONNECTED: lets play... ", connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log("connection failed");
        // process.exit(1)
    }
}

module.exports = connectDb;