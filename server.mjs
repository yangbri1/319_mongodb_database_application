// necessary imports for functioning server-side MongoDB database application
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';   // parse data from input URL path

// proper setups
// Note: This should be before PORT (sequencing matters) otw PORT will direct to 3001
dotenv.config();    
// create an instance of Express
const app = express();
// declare PORT to either be from environmental variable or default to 3001 -- dynamically adapt to different environments (ports too)
let PORT = process.env.PORT || 3001;

// DB connection

// middleware functions

// routes

// listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});