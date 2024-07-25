exports.logOut = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        res.cookie("token", "", cookieOptions);
        return res.status(200).json({
            message: "Session out...",
            logout: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Something went wrong..."
        });
    }
};
