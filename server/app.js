const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// CORS Middleware
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-timezone']  // Allowed headers
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route to test if the server is running
app.get("/", (req, res) => {
    res.send("Hi");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_KEY)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch(error => {
        console.log("MongoDB Not Connected! ", error.message);
    });

// Import and use routes
const scheduleRouter = require("./routes/schedule.routes");
app.use("/api/schedule", scheduleRouter);

const userRouter = require("./routes/users.routes");
app.use("/api/users", userRouter);

const uploadRouter = require("./routes/upload.routes");
app.use("/api/upload", uploadRouter);

const adminRouter = require("./routes/admin.routes");
app.use("/api/admin", adminRouter);

const equipmentRouter = require("./routes/equipment.routes");
app.use("/api/equipments", equipmentRouter);

// CORS for preflight requests
app.options('*', cors());  // Handle preflight requests

module.exports = app;
