const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plaese, provide name"]
    },
    email: {
        type: String,
        required: [true, "Plaese, provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Plaese, provide password"]
    },
    profile_pic: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
