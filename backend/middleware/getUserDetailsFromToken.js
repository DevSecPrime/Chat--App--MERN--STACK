const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUserDetailsViaToken = async (token) => {
    try {
        if (!token) {
            return {
                message: "Session out...",
                logout: true
            };
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token data:", decodedToken);

        const user = await User.findById(decodedToken.id).select('-password');

        user.password = undefined;

        if (!user) {
            return {
                message: "User not found...",
                logout: true
            };
        }

        return user;
    } catch (error) {
        console.log("Got an error:", error);
        throw error;
    }
};
