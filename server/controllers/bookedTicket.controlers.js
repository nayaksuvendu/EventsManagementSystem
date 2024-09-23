import bookedticket from "../models/bookedTicket.model.js";

export const createbookedticket = async(req,res,next)=>{
    const newbookedbookedticket = new bookedticket(...req.body);
    try{
        const savedbookedbookedticket=await newbookedbookedticket.save()
        res.status(200).json(savedbookedbookedticket);
    }catch(err){
        next("err")
    }

}


export const getbookedticket = async(_req,res,next)=>{
    try{
        const getconfirm=await bookedticket.find()
        res.status(200).json(getconfirm);
    }catch(err){
        next(err)
    }

}

