import { Router } from "express";
import { ProductsController } from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid",ProductsController.getProductById);

router.post('/', ProductsController.createProduct);

router.put("/:pid", ProductsController.updateProduct);

router.delete("/:pid", ProductsController.deleteProductById);

export { router as productsRouter };


