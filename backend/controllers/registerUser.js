const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

//function to check our file type is available in supported fileType
function isSupportedFileType(type, supportedFileType) {
    return supportedFileType.includes(type)
};

//fucntion to upload on cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    console.log("Temp file pATH :------------------", file.tempFilePath);

    if (quality) {
        options.quality = "auto"; ///automatically dettect the file type
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options)
};

//register user handler ---> Sign up
exports.registerUser = async (req, res) => {
    try {
        //fetch data from the user
        const { name, email, password } = req.body
        console.log("name email password:", name, email, password);

        //fetch file form file
        const file = req.files.profilePic;
        console.log("profile pic is:---------------------------------------------->", file);

        //check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists..."
            })
        }

        //if image file ----> profile image is not found
        if (!file) {
            return res.status(401).json({
                success: false,
                message: "Oops!...File is missing."
            })
        };

        //encrypt the password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong..."
            })
        }

        //define logic for upload image

        //validation of file
        const supportedFileType = ["jpg", "png", "jpeg"];
        const myFileType = file.name.split(".")[1].toLowerCase();
        console.log("The profile-image file type given as input------------------->", myFileType);

        //now, let`s verify that myfiletype is existing in supportedFilType

        if (!isSupportedFileType(myFileType, supportedFileType)) {
            return res.status(401).json({
                success: false,
                message: "file type is not supported..."
            })
        }

        //if supported --------> upload it to cloudinary
        console.log("-------------------uploading file to cloudinary------------------------");
        const response = await uploadFileToCloudinary(file, "ChatAppData");
        console.log("Response :-------------------", response)

        //after satisfying these all terminologies...
        //store data in database  ----> here i am creating an abojectv to store data in  db not using a function create

        const payload = {
            name,
            email,
            password: hashPassword,
            profile_pic: response.secure_url
        }


        const newUser = new User(payload)
        const newUserData = await newUser.save();

        res.status(200).json({
            success: true,
            data: newUserData,
            message: "User created successfully..."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || error,
            message: "Server error..."
        })
    }
}