// import relevant modules to be used
import express from 'express';
import Character from '../models/characterSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
router.get('/', (req, res) => {
    res.send(`Testing routes`);
});

// Create

// Read

// Update

// Delete

export default router;