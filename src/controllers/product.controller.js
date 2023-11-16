
import { ProductsService } from "../services/products.service.js";

export class ProductsController{
    static getProducts = async (req, res) => {
        try {
            const products = await ProductsService.getProducts(); 
            res.json({ status: 'success', data:products });
            // res.render('home',products)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static getProductById =  async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await ProductsService.getProductById(productId);
            res.json({ message: "Endpoint para obtener producto", data:product});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    }    
    static createProduct = async (req,res)=>{
        try {
            const product=req.body;
            const result = await ProductsService.createProduct(product);
            res.json({ status: 'success', data: result })
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
    }
    static updateProduct =  async (req, res) => {
        try {
            const productId = req.params.pid;
            const updatedProductInfo = req.body;
            const updatedProduct = await ProductsService.updateProduct(productId, updatedProductInfo);
            res.json({ status:'success', message: "Producto actualizado", data: updatedProduct });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    static deleteProductById = async (req, res) => {
        try {
            const productId =req.params.pid;
            await ProductsService.deleteProduct(productId);
            res.json({ message: "Producto eliminado con éxito" });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    
}