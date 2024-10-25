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

/* UPDATE */

/* DELETE */

export default router;