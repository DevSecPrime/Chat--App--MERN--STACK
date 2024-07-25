const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database is connected succesfully...")
    }).catch((error) => {
        console.log("error:", error);
        console.log("Issue in databse connection....")
        process.exit(1);

    })
};

module.exports = dbConnect;