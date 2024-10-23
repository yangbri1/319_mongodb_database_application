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

/* Create - POST route handler*/
// create a new character to be added to MongoDB Character collection
router.post('/', async (req, res) => {
    // try-catch block to catch any potential errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // create new instance of the model, pass in new document
        const newCharacter = new Character(req.body);

        // invoke .save() method to save newly created document (character) to database
        await newCharacter.save();

        // return all characters in JSON string format to client
        res.json({});
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - POST"});
    }
});

/* Read */
// retrieve all of the documents in Character collection
router.get('/', async (req, res) => {
    // try-catch error handling to handle any possible extraneous errors
    try {
        // call Mongoose .find() function with empty object {} to query all documents from Character collection
        // Aside: .find() method could look for documents fulfilling a single-field or compound fields
        const allCharacters = await Character.find({});

        // return all characters in JSON string format to client
        res.json(allCharacters);
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

/* Update */
// 
router.patch('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PATCH"});
    }
});

/* Delete */

export default router;