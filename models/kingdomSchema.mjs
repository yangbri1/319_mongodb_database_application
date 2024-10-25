// first and foremost import Mongoose library to use .find() and other Mongoose-related methods in creating a schema
import mongoose from 'mongoose';

// produce a Mongoose schema for kingdom
const kingdomSchema = new mongoose.Schema({
    // declare schema fields with their properties & validation rules within
    name: {
        // validate data before saving to database
        type: String,   // "name" field must be on type String
        required:true,  // "name" is required
        unique: true    // "name" specified to be unique such that there are no duplicate entries to database
    },
    // Side Note: Why wasn't "location" field set to be "unique"? Because some kingdoms could share a location in the OP world
    location: {
        type: String,
        required: [true, `Please provide a location for the kingdom`]
    },
    // field showing whether or not a kingdom abides to the central world government
    world_government: {
        type: Boolean,
        default: false,     // defaults to 'false'
        // required: true   // not a required field
    }
});

// index kingdom schema by government affiliation in ascending order -- government affilated kingdoms on top
kingdomSchema.index({world_government: 1});

/* static methods below similar to static (non-static) attributes for class, ...
attributes to model -- characteristics of "kingdomSchema" */
kingdomSchema.statics.govAffiliated = function(){
    // return all government affiliated groups
    return mongoose.model("Kingdom").find({ world_government: true });
}

// endow .govUnaffiliated attribute for kingdomSchema model -- each document kingdom has a .govUnaffiliated trait if "world_government" property was false
kingdomSchema.statics.govUnaffiliated = function(){
    // return all government dissociated groups
    return mongoose.model("Kingdom").find({ world_government: { $eq: false }});
}

// export out kingdomSchema for later use in kingdom route creation
export default mongoose.model("Kingdom", kingdomSchema);