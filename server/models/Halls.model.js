import mongoose from 'mongoose';

const HallsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
        required:true,
    },
    photos:{
        type:[String]
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    slots:{
        type:[String],
    },
    affordableprice:{
        type:String,
        required:true,
    }
},{timestamps:true});

export default mongoose.model("Halls",HallsSchema)