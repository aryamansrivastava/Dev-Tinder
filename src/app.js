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