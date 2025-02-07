// cookie parser is middleware to Extracts cookies 
// from requests and makes them available in req.cookies

// Cors Allows the frontend (React/Vue) to communicate 
// with the backend (Express) across different origins

// ex -> This allows frontend (http://localhost:5173) to call APIs hosted on http://localhost:3000.
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(express.json());  // Parse incoming JSON data
app.use(cookieParser());  // Enable cookie handling

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// first connects app to mongoDB and 
// then starts to listen on the server 
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