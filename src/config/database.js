import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export let connectToDatabase = async () => {
    console.log("MONGO_URL: ", process.env.MONGO_URL);
    // connects the server to the mongoDB database running in mumbai region
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database ...... ")
}