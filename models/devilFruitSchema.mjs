// import Mongoose for creating schema
import mongoose from 'mongoose';

// generate a devil_fruit schema
const devilfruitSchema = new mongoose.Schema({
    // schema fields
    moniker: {
        // schema property types
        type: String,
        required: true
    },
    // field "type" is required and has properties of ...
    type: {
        // array of string to choose from, if input property is invalid -- message would be prompted, defaults to "undefined" & convert to uppercase before output
        type: String,
        enum: ["undefined", "Logia", "Paramecia", "Zoan", "Mythical Zoan", "Ancient Zoan"],
        message: "{VALUE} is not a valid type of devil fruit ...",
        default: "undefined",
        uppercase: true,
        required: true
    },
    ability: {
        type: String
    },
    user: {
        type: String
    },
    awakened: {
        type: Boolean,
        default: false,
        required: [true, `Please give an 'awakened' status`]
    }
});

// static method for finding "Logia" type devil fruits to model
devilFruitSchema.statics.typeLogia = function(){
    // return the "LOGIA" property in the schema field "type"
    return mongoose.model("Devil_Fruit").find({ type: "LOGIA" });
}

// static method for finding "Paramecia" type devil fruits to model
devilFruitSchema.statics.typeParamecia = function(){
    // return the "PARAMECIA" property in the schema field "type"
    return mongoose.model("Devil_Fruit").find({ type: "PARAMECIA" });
}

// static method for finding "Zoan" type devil fruits to model
devilFruitSchema.statics.typeLogia = function(){
    // return all kinds of "ZOAN" properties in the schema field "type"
    return mongoose.model("Devil_Fruit").find({ type: { $match: "ZOAN" }}); // {$regex: /ZOAN/ }
}

// static method for finding all successfully "Awakened" devil fruits to model
devilFruitSchema.statics.isAwakened = function(){
    // return every awakened devil fruit
    return mongoose.model("Devil_Fruit").find({ awakened: true}); 
}

// index devil fruit schema by "moniker" in ascending order
devilfruitSchema.index({moniker: 1});

// use mongoose.model() method in Mongoose module to generate a collection of a MongoDB database
// compile devil fruit schema into the model for later use and export to "devilFruitRoutes.mjs"
// hereafter the "devilFruitSchema" is known by "Devil_Fruit"
export default mongoose.model("Devil_Fruit", devilFruitSchema);