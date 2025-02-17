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

// fetch single character by its unique "_id"
// Side Note: required additional req.path /character added to req.baseUrl /characters else this GET route overshadows all other child routes built on base Url path /characters afterwards
router.get('/character/:id', async (req, res) => {
    // try-catch block to catch any possible errors from invalid :id insertion by user
    try {
        /* Note: Since Mongoose inherently type-cast fields, there is no need to wrap the parameter id within ObjectId() */
        // use Mongoose's .findById() method to query by document's "_id"
        const singleCharacter = await Character.findById(req.params.id);
        /* Aside: res.send() method will also work here, but since we are working with Express -- develop RESTful API's ... 
        handling JSON data, may be better to use res.json() [converts to json stringify & res.send() at end anyways] */
        res.json(singleCharacter);
    } catch (err) {
        // logs out error, status code, custom message if encounter error
        console.error(err);
        res.json({msg: "Internal Server Error - GET Character (singular)"}).status(500);
    }
});

// get all existing bounties
router.get('/bounties', async (req, res) => {
    try {
        // collect all of the non-zero bounties
        let bounties = await Character.bountyActive({});
        // print out gathered bounties
        res.json(bounties);
    } catch (err) {
        // console out errors
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET All Bounties"})
    }
});

// find all wanted status -- "DEAD" and "ALIVE"
router.get('/status', async (req, res) => {
    try {
        // gather up all wanted statuses
        let status = await Character.wantedStatus({});
        // log out all characters with any available wanted status
        res.json(status);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET All Status"});
    }
});

// find all "ALIVE" wanted status
router.get('/status/alive', async (req, res) => {
    try {
        // gather up all "ALIVE" wanted statuses
        let status_alive = await Character.wantedAlive({});
        // log out all characters given an "ALIVE" wanted status
        res.json(status_alive);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET ALIVE Status"});
    }
});

// find all "DEAD" wanted status
router.get('/status/dead', async (req, res) => {
    try {
        // gather up all "DEAD" wanted statuses
        let status_dead = await Character.wantedDead({});
        // log out all characters given an "DEAD" wanted status
        res.json(status_dead);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET DEAD Status"});
    }
});

/* Update */
// access an existing character by their :id & update their bio
router.patch('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        // return results to client as JSON string
        res.json(updatedCharacter);

    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PATCH"});
    }
});

/* Delete */
// access a character by their request parameters :id & permanently remove character from database
router.delete('/:id', async (req, res) => {
    try {
        // find character by requested :id, delete & cache it to variable "deletedCharacter"
        let deletedCharacter = await Character.findByIdAndDelete(req.params.id);

        // call forth the deleted character from the database
        res.json(deletedCharacter);
        
    } catch (err) {
        // throw custom status with custom message if encounter an error
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"});
    }
});

export default router;