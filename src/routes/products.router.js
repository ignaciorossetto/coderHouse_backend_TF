import { Router } from "express";
import { passportCall } from "../utils.js";


import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
  deleteall,
  add_15_FakeProducts,
} from "../controllers/products.controller.js";
import { uploadProductsImage } from "../utils/multerConfig.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", passportCall('jwt-premium'), uploadProductsImage.single('image'), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", passportCall('jwt-premium'), deleteProductById);
router.delete("/", deleteall);
router.patch('/', add_15_FakeProducts)

export default router;
