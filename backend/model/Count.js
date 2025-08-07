import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
    countName:{
        type:String,
    },
    countValue:{
        type:Number,
        default:0
    },
});




//compile the schema to model
const Count = mongoose.model("Count", countSchema);
export default Count;