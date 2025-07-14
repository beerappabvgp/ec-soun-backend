import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
    },

}
);

// Creates a new User Table in the database

let User = mongoose.model("User", userSchema);

export default User;