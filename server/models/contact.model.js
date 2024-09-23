import mongoose from 'mongoose';

const ContactSchema= new mongoose.Schema({
    email:{
        type:String,
        
    },
    ph:{
        type:String,
        
    },
    message:{
        type:String,
        
    },
    
});

export default mongoose.model("contact",ContactSchema)