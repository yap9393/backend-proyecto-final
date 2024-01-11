import { Router } from "express";
import { ProductsController } from "../controllers/product.controller.js";
import { isAuth , checkRole} from "../middlewares/auth.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid",ProductsController.getProductById);

// router.post('/', isAuth, checkRole(['admin','premium']), ProductsController.createProduct);

router.post('/', ProductsController.createProduct);

router.put("/:pid", isAuth, checkRole(['admin']), ProductsController.updateProduct);

router.delete("/:pid", isAuth, checkRole(['admin']),  ProductsController.deleteProductById);


export { router as productsRouter };


