const express = require('express');
const app = express();
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleWare/errorHandler');
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/usersRoutes");
const adminRoute = require("./routes/adminRoute");
const quizRoute = require("./routes/quizRoute");
const User = require("./models/userModel")
const cors = require('cors');

// Database connection
connectDb();

// Middlewares
app.use(cors());
app.use(express.json());

// Application Routes
app.use("/api/users",usersRoute);
app.use("/api/admin",adminRoute);
// app.use("/api/quiz/results", quizResultRoute);
app.use('/api/quizzes', quizRoute);
app.use(errorHandler);

// Connection Ports
const port = process.env.PORT || 5000;

// Listening to server
app.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
});