const express = require("express");
const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

// Uses userAuth middleware to ensure only logged-in users can access this route.
// Retrieves the authenticated user's data from req.user.

profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try {
    const user = req.user;
    res.send(user);
    }
    catch(err) {
        res.status(400).send("Error : " + err.message);
    }
});

profileRouter.put("/profile/edit", userAuth, async(req, res) => {
    try {
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request");
        }
        const loggedInUser = req.user;

        // Updates the logged-in user’s profile dynamically based on the request body.
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        // saving the changes to db
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your Profile Updated Successfully`,
            data: loggedInUser,
        });
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;