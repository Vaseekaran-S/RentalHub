
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-timezone']
  }));

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });
    next();
});

app.get("/", (req, res) => {
    res.send("Hi");
})

mongoose.connect(process.env.MONGODB_KEY)
    .then(() => {
        console.log("MongoDb Connected!");
    })
    .catch(error => {
        console.log("MongoDb Not Connected! ", error.message);
    })

const scheduleRouter = require("./routes/schedule.routes")
app.use("/api/schedule", scheduleRouter)

const userRouter = require("./routes/users.routes")
app.use("/api/users", userRouter)

const uploadRouter = require("./routes/upload.routes")
app.use("/api/upload", uploadRouter)

const adminRouter = require("./routes/admin.routes")
app.use("/api/admin", adminRouter)

const equipmentRouter = require("./routes/equipment.routes")
app.use("/api/equipments", equipmentRouter)

app.options('*', cors());

module.exports = app