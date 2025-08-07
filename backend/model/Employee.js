import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    srno:{
       type:String || Number,
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
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
      unique:true
    },
    department: {
        type: String,
        default: "Not assigned yet",
    },
    joinDate:{
       type:Date,
       default:Date.now
    },
    position: {
        type: String,
        default: "",
    },
    createdAt: {
            type: Date,
            default: Date.now,
        },
},
{timestamps:true}
);




//compile the schema to model
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;