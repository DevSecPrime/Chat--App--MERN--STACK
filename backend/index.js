const express = require("express");
const app = express();

require("dotenv").config();

//middleware to parse in json
app.use(express.json());

const PORT = process.env.PORT || 8080;

//cors for connect with different platform
const cors = require("cors");
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


//initiate cookie-parse middle ware for auth
const cookieParser = require("cookie-parser");
app.use(cookieParser());

////used this middleware for upload the file --> can also use multer
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//import the cloudinary for upload the image on cloudinary
const cloudinary = require("./config/uploadToCloudinary");
cloudinary.cloudinaryConnect();

//conect data base
const dbConnect = require("../backend/config/database")
dbConnect();

//mount router
const chatAppRouter = require("./routes/routes");
app.use("/api/v1", chatAppRouter);

//start server
app.listen(PORT, () => {
    console.log(`Your server is running on port:- ${PORT}`);
})

//default router
app.get("/", (req, res) => {
    res.send("<h1> Chat App ---- Home Page </h1>");
})