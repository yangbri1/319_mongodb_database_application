// import Mongoose to use built-in mongoose methods in creating character schema
import mongoose from 'mongoose';

// creating a Mongoose schema for character
const characterSchema = new mongoose.Schema({
    // defining schema fields with their respective properties
    name: {
        type: String,
        required: [true, 'Please include a name'],  // configuring custom error message using array syntax
        /* Note: MongoDB by default would create an unique ndex on "_id" field during collection creation
         "name" field is now an unique index alongside "_id" (Could be seen on MongoDB Compass) */
        unique: true        // setting "unique" property to true means there will be no duplicate names
    },
    // schema field "race" of schema type "String" , default to "human" & required 
    race: {
        type: String,
        default: "human",
        lowercase: true,    // schemaType option to lowercase 'race' before saving
        required: true,
    },
    // schema field "devil_fruit" of "Boolean" type, default to no powers & required
    devil_fruit: {
        type: Boolean,
        default: false,
        required: true
    },
    // schema field "bounty" must be of "Number" type & non-negative integer (natural number)
    bounty: {
        type: Number,
        min: 0, 
        // Aside: {VALUE} in Mongoose will yield validated & failing value
        message: "Must be at least 0, got {VALUE}",  // setting custom validator error message using object syntax
    },
    // schema field "wanted" of type "String" in array of Strings is required 
    wanted: {
        type: String,
        // enumeration
        enum: {
            values: ['ALIVE', 'DEAD'],
            // Mongoose implicitly replaces {VALUE} with value of validated
            message: `{VALUE} is unsupported`
        },
        uppercase: true // schemaType option converting 'wanted' statuses to uppercase before saving
    }

});

// schema indexing by "bounty" field  in descending order (largest to smallest)
characterSchema.index({bounty: -1});

// adding "bountyActive" static method to model -- every character will have this feature available
characterSchema.statics.bountyActive = function(){
    // check if the character has a bounty (non-zero)
    return mongoose.model("Character").find({bounty: { $gt: 0 }});
}

// defining schema static method of "wantedStatus" to Mongoose model
characterSchema.statics.wantedStatus = function(){
    // look for all characters with a wanted status presented using .find() method with $ne operator to make sure "Wanted" field is null (no String)
    return mongoose.model("Character").find({ wanted: { $ne: null } }); // "" as value still shows all statuses
}

// schema static method of "wantedAlive" to Mongoose model
characterSchema.statics.wantedAlive = function(){
    // look for all characters with a wanted "ALIVE" status presented using .find() method 
    return mongoose.model("Character").find({ wanted: "ALIVE" }); 
}

// schema static method of "wantedDead" to Mongoose model
characterSchema.statics.wantedDead = function(){
    // look for all characters with a wanted "DEAD" status presented using .find() method 
    return mongoose.model("Character").find({ wanted: { $eq: "DEAD" } }); 
}

// calling mongoose.model() function makes a copy on "characterSchema" & Mongoose compiles it
// export Mongoose model of key-value pair such that "Character" refers to "characterSchema" 
// Note: Elsewhere calling on "Character" allows access to its fields with properties
export default mongoose.model("Character", characterSchema);