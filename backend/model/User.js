import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        require:true
    },
    employee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "employee",
        }
    ],
},
    {
        timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
       virtuals: true,
    },
    }
);


//compile the schema to model
const User = mongoose.model("User", UserSchema);
export default User;