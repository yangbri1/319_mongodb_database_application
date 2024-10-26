// import necessary Express library & module kingSchema
import express from 'express';
import Kingdom from '../models/kingdomSchema.mjs';

// create an instance of Express Router to handle HTTP CRUD routes (with middlewares usually) separately outside of server.mjs
const router = express.Router();

// 1. specify collection (handled in schema file already)
// 2. specify action
// 3. return results
// 4. wrap in try-catch for error-handling (why not? -- more transparency)

/* CREATE */
// create document kingdom for the collection kingdoms if it fulfills schema validation rules
router.post('/', async (req, res) => {
    try {
        // initialize a new Kingdom from the req.body
        const newKingdom = new Kingdom(req.body);
        // saves the new Kingdom document into collection of Kingdoms if it passes validation rules
        await newKingdom.save();
        // prints out kingdoms
        res.json({});
    
    // catch any errors 
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - POST"})
    }
});

/* READ */
// retrieve all kingdoms from the database
router.get('/', async (req, res) => {
    try {
        // cache all kingdoms in the database to variable
        const allKingdoms = await Kingdom.find({});
        // print out collection of kingdoms in JSON string format to client
        res.json(allKingdoms);
    } catch (err) {
        // catch any possible errors & print out error status and message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET All Kingdoms"});
    }
});

// look up an kingdom by its req.params id linking to its unique "_id" in database
/* Note: Seem to not affect GET routes after this one if using just "/:id" in path but previously it did in last module for Express (318_SBA).
Keeping the path URL to "/kingdom/:id" for reading [just in case] */
router.get('/kingdom/:id', async (req, res) => {
    try {
        // survey the kingdoms collection for a partcular kingdom by its "_id" using MongoDB .findById() method 
        const singleKingdom = await Kingdom.findById(req.params.id);
        // return the single kingdom in all of its glory
        res.json(singleKingdom);
    } catch (err) {
        // catch any errors & report it to CLI with a custom error status with custom error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Kingdom (singular)"})
    }
});

// search for kingdoms affiliated to the world government
router.get('/gov_affiliated/yes', async(req, res) => {
    try {
        // declare a variable to contain all kingdoms with government ties
        const gov_affiliated_yes = await Kingdom.govAffiliated({});
        // return all government-backed entities
        res.json(gov_affiliated_yes);
    } catch (err) {
        // standard error outputs if any errors
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Government Affiliated - YES"});
    }
});

// search for kingdoms NOT affiliated to the world government
router.get('/gov_affiliated/no', async(req, res) => {
    try {
        // declare a variable to contain all kingdoms WITHOUT government ties
        const gov_affiliated_no = await Kingdom.govUnaffiliated({});
        // return all government unaffiliated entities
        res.json(gov_affiliated_no);
    } catch (err) {
        // standard error outputs if any errors
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Government Affiliated - NO"});
    }
});

/* UPDATE */
// look for kingdom in collection by its unique "_id" and update 
router.put('/:id', async (req, res) => {
    try {
        // find kingdom by req.params.id, update its fields by inputted req.body, & retain it
        let updatedKingdom = await Kingdom.findByIdAndUpdate(req.params.id, req.body, {new: true});
        // return the new results 
        res.json(updatedKingdom);
    } catch (err) {
        // outputs for when things go awry
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - !! PUT !!"})
    }
});

/* DELETE */
// locate kingdom in collection from its unique "_id" and delete
router.delete('/:id', async (req, res) => {
    try {
        // find kingdom by req.params.id & delete -- do NOT need to cache but we do to output
        let deletedKingdom = await Kingdom.findByIdAndDelete(req.params.id);
        // return the new results 
        res.json(deletedKingdom);
    } catch (err) {
        // outputs for when things does NOT go to plan
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"})
    }
});

export default router;