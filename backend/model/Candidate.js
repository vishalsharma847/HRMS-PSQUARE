import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    srno:{
       type:String || Number,
    },
    name:{
        type:String,
        required:true
    },
    phoneno:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    position: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "New",
        enum: ["New", "Ongoing","Scheduled","Selected","Rejected"],
    },
    experience:{
       type:String,
      required:true
    },
    resumeurl:{
        type:String
    },
    createdAt: {
            type: Date,
            default: Date.now,
        },
},
{timestamps:true}
);


//compile the schema to model
const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;