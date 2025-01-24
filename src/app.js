const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require('bcrypt');

app.use(express.json());
 
app.post("/signup", async (req,res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        // Encrypt the password  
        const passwordHash = await bcrypt.hash(password, 10);

        // creating a new instance of the User model
        const user = new User ({
            firstName, 
            lastName, 
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User Added Successfully");
    } 
    catch(err) {
        res.status(400).send(" Error saving the user:" + err.message);
    }
});

app.post("/login", async(req,res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            res.send("Login Successful!!!");
        }
        else {
            throw new Error("Password is not correct");
        }
    }
    catch(err) {
        res.status(400).send(" Error saving the user:" + err.message);
    }
});

// Get user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId : userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }

        // const users = await User.find({emailId:userEmail});
        // if(users.length===0){
        //     res.status(404).send("User not found");
        // }
        // else{
        //     res.send(users);
        // }
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Feed API - GET/ feed - get all users from the database
app.get("/feed", async(req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Api to delete a user from the database
app.delete("/user", async(req,res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Update a user data from the database
app.patch("/user", async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body; 

    try {
        const ALLOWED_UPDATES = [
            "userId",
            "photoUrl",
            "about",
            "gender", 
            "age", 
            "skills",
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true,
        });
        res.send("User Updated Successfully");
    }
    catch(err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
});

connectDB()
.then(() => {
    console.log("DataBase Connection established...");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...")
    });
})
.catch((err) => {
    console.error("Database cannot be connected");
}); 