
// defines a Mongoose schema for connection requests between users, 
// ensuring valid statuses and preventing self-requests. 
// It also indexes requests for faster lookups and enforces constraints before saving.

const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",     // reference to the user collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values:["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    } ,
}, 
{ timestamps: true }
);
 
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    // check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send Connection Request to yourself!!");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",  
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;