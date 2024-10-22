// necessary imports for functioning server-side MongoDB database application
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';   // import NPM package body-parser to parse incoming HTTP request bodies
import connectDB from './db/conn.mjs';  // import connectDB function module to establish connection
import characterRoutes from './routes/characterRoutes.mjs';

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
app.use(bodyParser.urlencoded({ extended: true }));     // parse out URL-encoded data from path URL to access data in req.body
app.use(bodyParser.json({ extended: true }));           // parse out JSON data to req.body

/* routes */
app.use('/characters', characterRoutes);    // incorporate characterRoutes into server

// app.get('/', (req, res) => {
//     res.send('Testing testing 1, 2, 3');
// });


// Express' app.listen() method starts server & tells app to listen on PORT for any incoming traffic
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});