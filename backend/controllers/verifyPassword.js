const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.verifyPassword = async (req, res) => {
    try {
        //fetch password from req.body & also fetch id for user
        const { password, userId } = req.body;
        //check pasword from user
        const user = await User.findById(userId);

        //verify the password...
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password does not matched..."
            })
        }

        //generated token 
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        console.log("Payload :- ", payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24hr" });

        user.token = token;
        await user.save();

        user.password = undefined

        const options = {
            httpOnly: true,
            secure: true
        };

        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user,
            message: "Logged in successfully..."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || error,
            message: "Server error..."
        })
    }
}