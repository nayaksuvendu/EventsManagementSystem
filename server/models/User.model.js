import mongoose from 'mongoose';

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,

    },
    phone:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    booking:{
        id : String,
        status : String
    }
},
{timestamps:true}
);

export default mongoose.model("User",UserSchema)