import { Router } from "express";
import { productsService } from "../persistence/index.js";


const router = Router();

//le doy el endpoint http://localhost:8080/api/products
router.get("/", async (req, res) => {
    try {
        const products = await productsService.getProducts(); 
        res.json({ data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//obtiene el producto por ID
router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({ message: "Endpoint para obtener producto", data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }

});

//agrega productos con post, pasados en el body
router.post("/", async (req, res) => {
    try {
        const productInfo = req.body;
        const newProductMade = await productsService.addProduct(productInfo);
        res.json({ message: "Producto creado", data: newProductMade });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// actualiza un producto por su ID
router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProductInfo = req.body;
        const updatedProduct = await productsService.updateProduct(productId, updatedProductInfo);
        res.json({ message: "Producto actualizado", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// elimina un producto por su ID
router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export { router as productsRouter };