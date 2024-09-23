import contact from "../models/contact.model.js";


export const createcontact = async(req,res,next)=>{
    const newContact = await contact.create(req.body)
    try{
        const savedContact = await newContact.save()
        res.status(200).json(savedContact);
    }catch(err){
       next("err")
    }

}

export const getcontact = async(req,res,next)=>{
    try{
        const data = await contact.find()
        res.status(200).json(data);
    }catch(err){
        next(err)
    }

}

