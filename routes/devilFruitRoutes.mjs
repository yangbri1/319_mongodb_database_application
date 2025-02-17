// import relevant modules to be used
import express from 'express';
import Devil_Fruit from '../models/devilFruitSchema.mjs';

// create an instance of Express' Router
const router = express.Router();

// 1. specify collection (not needed as done already in schema -- SOC)
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle errors

/* CREATE */
// place a new devil fruit to MongoDB Devil_Fruit collection
router.post('/', async (req, res) => {
    // try-catch block to catch any potential errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // create new instance of the model, pass in new document
        const newDevil_Fruit = new Devil_Fruit(req.body);

        // invoke .save() method to save newly created document (devil fruit) to database
        await newDevil_Fruit.save();

        // return all devil fruits in JSON string format to client
        res.json({});
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);

        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - POST"});
    }
});

/* READ */
// retrieve all of the documents in Devil_Fruit collection
router.get('/', async (req, res) => {
    // try-catch error handling to handle any possible extraneous errors
    try {
        // call Mongoose .find() function with empty object {} to query all documents from Devil_Fruit collection
        // Aside: .find() method could look for documents fulfilling a single-field or compound fields
        const allDevil_Fruits = await Devil_Fruit.find({});
        
        // return all devil fruits in JSON string format to client
        res.json(allDevil_Fruits);
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

// grab a devil fruit document by its unique "_id"
router.get('/devil_fruit/:id', async (req, res) => {
    try {
        // look for a particular devil fruit in the database by it's "_id"
        const singleDevilFruit = await Devil_Fruit.findById(req.params.id);
        // output a single devil fruit's full info document in JSON string format to browser
        res.json(singleDevilFruit);
    } catch (err) {
        // catch any possible errors and return custom error code as well as message to client
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Devil Fruit (singular)"});
    }
});

// find all "LOGIA" type devil fruits
router.get('/category/logia', async (req, res) => {
    try {
        // collect all "LOGIA" devil fruits
        const category_logia = await Devil_Fruit.typeLogia({});
        // yield all "LOGIA" types
        res.json(category_logia);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET LOGIA Category"});
    }
});

// find all "PARAMECIA" type devil fruits
router.get('/category/paramecia', async (req, res) => {
    try {
        // collect all "PARAMECIA" devil fruits
        const category_paramecia = await Devil_Fruit.typeParamecia({});
        // yield all "PARAMECIA" types
        res.json(category_paramecia);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET PARAMECIA Category"});
    }
});

// find all "ZOAN", "MYTHICAL ZOAN", "ANCIENT ZOAN" type devil fruits
router.get('/category/zoan', async (req, res) => {
    try {
        // collect all "ZOAN" devil fruits
        const category_zoan = await Devil_Fruit.typeZoan({});
        // yield all "ZOAN" types
        res.json(category_zoan);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET ZOAN Category"});
    }
});

// find all "AWAKENED" devil fruits 
router.get('/awakened', async (req, res) => {
    try {
        // collect all "AWAKENED" devil fruits
        const awakened_fruits = await Devil_Fruit.isAwakened({});
        // yield all "AWAKENED" types
        res.json(awakened_fruits);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET AWAKENED Category"});
    }
});

// find all average "UNAWAKENED" devil fruits 
router.get('/unawakened', async (req, res) => {
    try {
        // collect all "devil fruits with "UNAWAKENED" status
        const sleeping_fruits = await Devil_Fruit.notAwakened({});
        // yield all "UNAWAKENED" types
        res.json(sleeping_fruits);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET UNAWAKENED Category"});
    }
});

/* UPDATE */
// access an existing devil fruit by their :id & update their info
router.patch('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedDF = await Devil_Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        // return results to client as JSON string
        res.json(updatedDF);

    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PATCH"});
    }
});

/* DELETE */
// access devil fruit by their request parameters :id & permanently remove it from database
router.delete('/:id', async (req, res) => {
    try {
        // find devil fruit by requested :id, delete & cache it to variable "deleteddDF"
        let deletedDF = await Devil_Fruit.findByIdAndDelete(req.params.id);

        // call forth the deleted devil fruit from the database
        res.json(deletedDF);
        
    } catch (err) {
        // throw custom status with custom message if encounter an error
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"});
    }
});

export default router;