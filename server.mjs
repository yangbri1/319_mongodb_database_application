// necessary imports for functioning server-side MongoDB database application
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';   // parse data from input URL path
import connectDB from './db/conn.mjs';  // import connectDB function module to establish connection

/* setting up */
// unpack environmental variables from .env file here for later use
// Note: This should be before PORT (sequencing matters) otw PORT will direct to 3001
dotenv.config();    
// create an instance of Express
const app = express();
// declare PORT to either be from environmental variable or default to 3001 -- dynamically adapt to different environments (ports too)
let PORT = process.env.PORT || 3001;

/* DB connection */
// invoke imported connectDB() function to connect to MongoDB
connectDB();

// Aside: This one-liner works as well but will NOT disclose whenever connection fails
// await mongoose.connect(process.env.mongoURI); 

/* middleware functions */

/* routes */
// app.get('/', (req, res) => {
//     res.send('Testing testing 1, 2, 3');
// });


// Express' app.listen() method starts server & tells app to listen on PORT for any incoming traffic
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});