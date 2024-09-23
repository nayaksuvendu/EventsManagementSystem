import express from "express";
import { createbookedticket,getbookedticket } from "../controllers/bookedTicket.controlers.js";

const router=express.Router();

router.put("/create",createbookedticket)
router.get("/",getbookedticket);

export default router;
