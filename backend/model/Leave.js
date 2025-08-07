import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    srno: {
      type: String || Number,
    },
    name: {
      type: String,
      required: true,
    },
    photourl: {
      type: String,
    },
    designation:{
      type:String,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date:{
        type:Date
    },
    reason:{
        type:String,
    },
     status: {
            type: String,
            default: "pending",
            enum: ["pending","approved", "rejected"],
        },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//compile the schema to model
const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
