
// connects a Node.js application to a MongoDB database using Mongoose
// It establishes a connection to a MongoDB Atlas cluster and exports 
// the connectDB function for use in other files.

const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(
        "mongodb+srv://srivastavaaryaman05:Aryamansri8931020149@namastenode.nbo2w.mongodb.net/devTinder");
    }
    catch (error) {
        console.log("something went wrong while connecting with database", error.message);
    }
}; 

module.exports = connectDB;


