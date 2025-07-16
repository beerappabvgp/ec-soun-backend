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
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    },
);

// Creates a new User Table in the database

let User = mongoose.model("User", userSchema);

export default User;