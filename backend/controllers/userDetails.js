const { getUserDetailsViaToken } = require("../middleware/getUserDetailsFromToken");

exports.userDetails = async (req, res) => {
    try {
        const token = req.cookies.token || "";
        const getUser = await getUserDetailsViaToken(token);

        if (getUser.logout) {
            return res.status(401).json({
                success: false,
                message: getUser.message
            });
        }

        return res.status(200).json({
            success: true,
            data: getUser,
            message: "User Details are fetched successfully..."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            error: error.message || error,
            message: "Something went wrong..."
        });
    }
};
