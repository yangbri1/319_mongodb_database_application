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

/* READ */

/* UPDATE */

/* DELETE */

export default router;