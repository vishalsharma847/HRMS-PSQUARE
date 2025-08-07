import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
      required:true
    },
    password:{
       type:String,
       required:true,
    },
    photourl:{
        type:String,
    },
    createdAt: {
            type: Date,
            default: Date.now,
        },
},
{timestamps:true}
);




//compile the schema to model
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;