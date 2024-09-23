import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import { sendEmail } from "../utils/sendEmail.js";
import emailvalidator from 'email-validator';
import dotenv from 'dotenv';
dotenv.config();

const genforgetPasswordToken = async function (argu){
    const resetToken = crypto.randomBytes(16).toString('hex') // generet random token
    argu.forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') // update resetToken into new token that store in db securly
    argu.forgetPasswordExpiry = Date.now() + 15*60*1000 // 15min
    await argu.save()
    return  resetToken;
   }


// USER REGISTER
export const register=async(req,res,next)=>{
    try{
        const{username,email,password,city,phone} = req.body;
        if(!username|| !email || !password || !city || !phone){
         return next(createError(400,"all field are required"))
        }
        if(!emailvalidator.validate(email)){
           return next(createError(400,'enter valid email'))
        }
      // Check if the user exists with the provided email
      const userExists = await User.findOne({ email });
     
      // If user exists send the reponse
      if (userExists) {
        return next(createError(403,'Email already exists', ));
      }
        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(password,salt);
        const newUser = new User({
            ...req.body,
            password: hash,

        });
        await newUser.save()
        res.status(201).json({
            success:true,
            message:"User registerd sucessfully",
          })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

//USER LOGIN
export const login = async(req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(createError(404,"User not found !!!"))}

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect) return next(createError(400,"Wrong password"));

        const isAdmin = user.isAdmin;

        const token =  jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,
                                 {expiresIn: process.env.JWT_EXPIRE});          

        res.cookie('access_token',token,{ httpOnly:true,}).status(200).json({
            success:true,
            message:"User login successfully",
            details:user,
            isAdmin
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


//Forget passord
export const forgotPassword = async(req,res,next)=>{
    const email = req.body.email
    const user = await User.findOne({email : req.body.email})
    const resetToken = await genforgetPasswordToken(user);
      
       const resetPasswordURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
       const subject = 'Reset password'
       const message = `you can reset your password by click on <a href=${resetPasswordURL} target="_blank">Reset</a>
        \nIf the above link doesn't work then copy link past on browser`;
  
     try{
        await sendEmail(email,subject,message);
        res.status(200).json({
        success:true,
        message:`Reset password link send to ${email} successfully`
        });
      }
      catch(e){
        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpiry = undefined;
        await user.save();
        return next(e.message,500)
      }
  }

  //Reset Password
 export const resetPassword = async(req,res,next)=>{
    const{resetToken} = req.params;
    const{password} = req.body;
 
    const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
 
    const user = await User.findOne({forgetPasswordToken,forgetPasswordExpiry:{$gt:Date.now()}});
    if(!user){
     return next(createError(400,"Token is expired or invalid"))
   }
 
   user.password = password;
   user.forgetPasswordExpiry = undefined;
   user.forgetPasswordToken = undefined;
     
   await user.save();
 
   res.status(200).json({
     success:true,
     message:'password updated successfully'
   })
 }



