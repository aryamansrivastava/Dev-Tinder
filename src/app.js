const express = require("express");

const app = express();

// This will only handle GET call to /user
// app.get("/user", (req,res) => {
//     res.send({firstName:"Aryaman", lastName:"Srivastava"});
// });

// app.post("/user", (req,res) => {
//     // saving data to DB
//     res.send("Data Saved Successfully to the Database");
// });

// app.delete("/user", (req,res) => {
//     res.send("Deleted Successfully");
// });

// // this will match all the HTTP method API calls to /test
// app.use("/test", (req,res) => {
//     res.send("Hello from the dashboard");
// });

// Playing with multiple Route Handlers
app.get(
    "/user",
    (req,res,next) => {
        console.log("Handling the route user!");
        next();
    },
    (req,res,next) => {
        console.log("handling the route user 2");
        next();
    },
    (req,res,next) => {
        console.log("handling the route user 3");
        next();
    },
    (req,res,next) => {
        console.log("handling the route user 4");
        res.send("4th Response");
    }
);

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
}); 