import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCartById,
  deleteall,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);
router.get("/:id", getCartById);
router.post("/", addCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCartById);
router.delete("/", deleteall);

export default router;
