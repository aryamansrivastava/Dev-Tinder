// This middleware authenticates users by verifying their JWT token 
// from cookies. If valid, it fetches the user from the database and 
// attaches it to req.user, allowing access to protected routes. 

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth =  async(req, res, next) => {
    
    try {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).send("Please Login!");
    }

    // Verify the JWT Token
    const decodedObj = await jwt.verify(token, "DEV@TINDER$790");

    const {_id} = decodedObj;

    const user = await User.findById(_id);

    if(!user) {
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth,
}