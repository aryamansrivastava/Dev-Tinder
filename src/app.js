const express = require("express");

const app = express();

// // This will only handle GET call to /user
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

// // this will match all the HTTP method API calls to test
// app.use("/test", (req,res) => {
//     res.send("Hello from the dashboard");
// });

// Playing with multiple Route Handlers
// app.get(
//     "/user",
//     (req,res,next) => {
//         console.log("Handling the route user 1");
//         // res.send("1st Response");
//         next();
//     }, 
//     (req,res,next) => {
//         console.log("handling the route user 2");
//         // res.send("2nd Response");
//         next();
//     },
//     (req,res,next) => {
//         console.log("handling the route user 3");
//         // res.send("3rd Response");
//         next();
//     },
//     (req,res,next) => {
//         console.log("handling the route user 4");
//         res.send("4th Response");
//     }
// );

// const {adminAuth, userAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.post("/user/login", (req,res) => {
//     res.send("User logged in Successfully");
// });

// app.get("/user",userAuth, (req,res) => {
//     res.send("User Data Sent");
// });

// app.get("/admin/getAllData", (req,res) => {
//     res.send("All Data Sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//     // logic of checking if the request is authorized
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         res.send("All Data Sent");
//     }
//     else{
//         res.status(401).send("UnAuthorized Request");
//     }
//     res.send("ALL Data Sent");
// });

// app.get("/admin/deleteUser", (req, res) => {
//     res.send("Deleted a User");
// })

// Error Handling

app.get("/getUserData", (req,res) => {
    try {
        // Logic of DB cal and get user data
        throw new Error("idhihds");
        res.send("User Data Sent");
    }
    catch(err){
        res.status(500).send("Some Error came contact support team");
    }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("something went wrong");
    }
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
}); 