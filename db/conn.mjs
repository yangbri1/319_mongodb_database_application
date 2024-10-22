import mongoose from "mongoose";
import dotenv from "dotenv";

// access environmental variables from .env 
dotenv.config();

// initialize connectionString variable to intake environmental variable mongoURI
const connectionString = process.env.mongURI;

// "async" function required in order to use "await" (required to connect to database)
export default async function connectDB(){
    // try-catch block for handling any errors during attempting to connect
    try {
        // connecting to database
        await mongoose.connect(connectionString);
        // console.log() output to terminal showing MongoDB connection is established
        console.log(`MongoDB connection established ...`);
    } catch (err) {
        // showcase error
        console.error(err);
        // if any error arose, kill process and close app
        process.exit(1);     
    }
}