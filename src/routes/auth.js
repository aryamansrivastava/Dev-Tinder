const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try {
      // Validation of data
      validateSignUpData(req);
  
      const { firstName, lastName, emailId, password } = req.body;
  
      // Encrypt the password (Hash the password before storing it)
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash);
  
      // Creating a new user instance
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });

      // save it to database
      const savedUser = await user.save();
      // Generates a JWT token for the user.
      const token = await savedUser.getJWT();

      // Set JWT token as a cookie (expires in 8 hours)
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
  
      res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

// finds user by email, validates password, generates token is correct credentials,
// stores the token in cookies for authentication

authRouter.post("/login", async(req,res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }      
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
           const token = await user.getJWT();

            res.cookie("token", token, {
                expires: new Date(Date.now() + 8*3600000),
            });
            res.send(user);
        }
        else {
            throw new Error("Password is not correct");
        }
    }
    catch(err) {
        res.status(400).send(" Error : " + err.message);
    }
});

// Clears the authentication token by setting it to null.
// Immediately expires the cookie, logging out the user.
authRouter.post("/logout", async(req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logged Out Successfully"); 
});

module.exports = authRouter;