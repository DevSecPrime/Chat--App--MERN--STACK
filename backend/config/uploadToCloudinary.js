const cloudinary = require("cloudinary").v2;
//here v2 is latest vesion of cloudinary

require("dotenv").config();

exports.cloudinaryConnect = () => {
    try {
        //we have to define 3 things while connecting with cloudniry 
        //1. cloud_name
        //2. api_key
        //3. api_secret

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    } catch (error) {
        console.log(error);
    }
};

