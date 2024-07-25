const User = require("../models/UserModel");

exports.verifyEmail = async (req, res) => {
    try {
        //fetch email from req body
        const { email } = req.body;

        //check email
        const checkUser = await User.findOne({ email }).select("-password");

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn`t exist..."
            })
        }

        res.status(200).json({
            success: true,
            data: checkUser,
            message: "Email verified successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || error,
            message: "Server error..."
        })
    }
}