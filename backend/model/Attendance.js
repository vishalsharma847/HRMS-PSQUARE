import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
      srno:{
          type:String || Number,
       },
       name:{
          type:String,
          required:true
       },
       employee: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Employee',
           required: true
         },
         task:{
           type:String,
           required:true
         },
          status: {
            type: String,
            default: "present",
            enum: ["present","absent", "medicalleave","workfromhome"],
        },
          createdAt: {
            type: Date,
            default: Date.now,
        },
},
{timestamps:true}
);




//compile the schema to model
const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;