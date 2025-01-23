
const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://srivastavaaryaman05:Aryamansri8931020149@namastenode.nbo2w.mongodb.net/devTinder"
    );
};

module.exports = connectDB;