const mongoose = require("mongoose");
const User = require("./UserModel");
const Message = require("./messageModel")

const conversationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        reqired: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        reqired: true
    },
    message: {
        type: mongoose.Schema.ObjectId,
        ref: "Message"
    }
});

const conversation = mongoose.model("Conversation", conversationSchema);
module.exports = conversation;



