import { Router } from "express";
import {
  getAllMessages,
} from "../controllers/messages.controller.js";


const router = Router();

router.get("/", getAllMessages);


export default router;
