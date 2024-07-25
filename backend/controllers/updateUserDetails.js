const { getUserDetailsViaToken } = require("../middleware/getUserDetailsFromToken");
const User = require("../models/UserModel")

exports.updateUserDetails = async (req, res) => {
    try {
        const token = req.cookies.token || "";

        const user = await getUserDetailsViaToken(token);

        //fetch data from req.body
        const { name, profile_pic } = req.body;
        const updateUser = await User.updateOne({ _id: user._id }, { name, profile_pic });

        console.log("Updated data:", updateUser);

        //find updated user data
        const updatedUserData = await User.findById(user._id);
        

        return res.status(200).json({
            success: true,
            data: updatedUserData,
            message: "User data updated succersssfully..."
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            error: error.message || error,
            message: "Something went wrong..."
        })
    }
}