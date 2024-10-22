// import relevant modules to be used
import express from 'express';
import Character from '../models/characterSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
// router.get('/', (req, res) => {
//     res.send(`Testing routes`);
// });

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle any extraneous errors

/* Create */

/* Read */
// 
router.get('/', async (req, res) => {
    // try-catch error handling to handle any possible extraneous errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // call Mongoose .find() function with empty object {} to query all documents from Character collection
        const allCharacters = await Character.find({});

        // return all characters in JSON string format to client
        res.json({});
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

/* Update */

/* Delete */

export default router;