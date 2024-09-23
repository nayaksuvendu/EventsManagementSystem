import express from "express";
import { login,register,forgotPassword,resetPassword } from "../controllers/auth.controller.js";
// import {firebaseControl} from '../controllers/firebase.controller.js';
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/forget",forgotPassword)
router.post("/reset/:resetToken",resetPassword)
// router.post('/register/google',firebaseControl )

export default router

