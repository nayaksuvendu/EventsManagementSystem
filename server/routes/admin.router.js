import express from "express";
import { userStats} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../midleware/verifyToken.js";
const router = express.Router();

router.get('/',verifyAdmin,userStats);

export default router;
