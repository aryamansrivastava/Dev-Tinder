const express = require('express');
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age gender about skills";

// Get all the pending Connection Requests for the loggedInUser
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName age gender about skills");

        res.json({ 
            message: "Data fetched Successfully",
            data: connectionRequests,
        });
    }
    catch(err) {
        req.status(400).send("ERROR: " + err.message);
    }
});
 
userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row)  => 
            {
                if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                return row.fromUserId; 
            });
        res.json({ data });
    }
    catch(err) {
        req.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/feed", userAuth, async(req, res) => {
    try {
        // User should see all the users card except
        // his own card
        // his connections
        // ignored people(people who have ignored this user)
        // card of users he already sent request

        const loggedInUser = req.user;

        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const skip = (page-1)*limit;

        // find all the connection request (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id } ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        
        const users = await User.find({
            $and: [ 
                {_id: { $nin: Array.from(hideUsersFromFeed) } }, 
                {_id: {$ne: loggedInUser._id}},
            ],
        }).select(USER_SAFE_DATA).skip().limit(limit);

        res.send(users);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
})
 
module.exports = userRouter;