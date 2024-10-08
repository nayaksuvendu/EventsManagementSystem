import User from "../models/User.model.js"
import bcrypt from "bcryptjs"



export const updateUser = async(req,res,next)=>{
    
    try{
        const salt=  bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body,password:hash},{new:true})
        res.status(200).json(updatedUser);
    }catch(err){
        next(err)
    }

}

export const deleteUser = async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }catch(err){
        next(err)
    }

}
export const getUser = async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user);
    }catch(err){
        next(err)
    }

}

export const getUsers = async(req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err)
    }

}