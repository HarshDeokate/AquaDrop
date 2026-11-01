
import express from "express";
import validate from "../../middleware/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js"; 

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  archiveProduct,
} from "./product.controller.js";

const router = express.Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", archiveProduct);


export default router;
