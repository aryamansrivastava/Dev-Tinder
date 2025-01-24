const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
 
app.post("/signup", async (req,res) => {
    // creating a new instance of the User model
    
    const user = new User (req.body);

    try {
        await user.save();
        res.send("User Added Successfully");
    } catch(err) {
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
})

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
    const userId = req.body.userId;
    const data = req.body; 
    try{
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true,
        });
        res.send("User Updated Successfully");
    }
    catch(err) {
        res.status(400).send("Something went wrong");
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