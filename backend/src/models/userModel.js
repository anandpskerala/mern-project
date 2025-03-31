import mongoose, { Schema } from "mongoose";

const schema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    profileImg: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true});

const user = mongoose.model("User", schema);

export default user;