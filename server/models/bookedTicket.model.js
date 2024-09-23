import mongoose from 'mongoose';

const ConfirmbSchema= new mongoose.Schema({
    bid:{
        type:String,
        
    },
    hname:{
        type:String,
    },
    sdate:{
        type:String,
        
    },
    edate:{
        type:String,
    }   
},{timestamps:true});

export default mongoose.model("bookedticket",ConfirmbSchema)