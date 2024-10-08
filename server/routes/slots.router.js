import express from "express";
import { createSlot, deleteSlot, getSlot, getSlots, updateSlot, updateSlotAvailabilty } from "../controllers/slots.controller.js";

import { verifyAdmin } from "../midleware/verifyToken.js";

const router=express.Router();

router.post("/:hallid",verifyAdmin,createSlot);

router.put("/:id",verifyAdmin,updateSlot);
router.put("/availabilty/:id",updateSlotAvailabilty);

router.delete("/:id",verifyAdmin,deleteSlot)

router.get("/:id",getSlot)

router.get("/",getSlots);


export default router
