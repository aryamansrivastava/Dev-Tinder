const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req,res) => {
    res.send({firstName:"Aryaman", lastName:"Srivastava"});
});

app.post("/user", (req,res) => {
    // saving data to DB
    res.send("Data Saved Successfully to the Database");
});

app.delete("/user", (req,res) => {
    res.send("Deleted Successfully");
});

// this will match all the HTTP method API calls to /test
app.use("/test", (req,res) => {
    res.send("Hello from the dashboard");
});
 
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
}); 