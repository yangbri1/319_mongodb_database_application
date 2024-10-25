// import Mongoose for creating schema
import mongoose from 'mongoose';

// generate a devil fruit schema
const devilFruitSchema = new mongoose.Schema({
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
        // Aside: Since we employed Mongoose's schema type String property 'uppercase', the enclosed array of strings in 'enum' must be all uppercase
        enum: ["UNDEFINED", "LOGIA", "PARAMECIA", "ZOAN", "MYTHICAL ZOAN", "ANCIENT ZOAN"],
        message: `{VALUE} is not a valid type of devil fruit ...`,
        default: "undefined", // no need for 'default' property when 'required: true' -- field needed
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
        /* feels as though the 'default' property is a tad redundant with 'required: true' right below ...
        because with 'required' being set to 'true' would NOT allow the field to be empty */
        // default: false,  
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
devilFruitSchema.statics.typeZoan = function(){
    // return all kinds of "ZOAN" properties in the schema field "type"
    // return mongoose.model("Devil_Fruit").find({ type: { $ne: "/bZOAN/b" }}); // {$regex: /ZOAN/ }, {$match: "ZOAN"}
    /* Note:  Above both $regex and $match didn't work -- here logical $and with equality $ne (not equal) operators combing multiple conditions worked */
    return mongoose.model("Devil_Fruit").find({ $and: [{ type: { $ne: "LOGIA" }}, { type: { $ne: "PARAMECIA"} }] });
}

// static method for finding all successfully "Awakened" devil fruits to model
devilFruitSchema.statics.isAwakened = function(){
    // return every awakened devil fruit
    return mongoose.model("Devil_Fruit").find({ awakened: true}); 
}

// static method for finding all normal "Unawakened" devil fruits to model
devilFruitSchema.statics.notAwakened = function(){
    // return every awakened devil fruit
    return mongoose.model("Devil_Fruit").find({ awakened: { $ne: true }}); 
}

// index devil fruit schema by "moniker" in ascending order
devilFruitSchema.index({moniker: 1});

// use mongoose.model() method in Mongoose module to generate a collection of a MongoDB database
// compile devil fruit schema into the model for later use and export to "devilFruitRoutes.mjs"
// hereafter the "devilFruitSchema" is known by "DevilFruit"
export default mongoose.model("Devil_Fruit", devilFruitSchema);