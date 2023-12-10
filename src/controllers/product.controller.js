import { ProductsService } from "../services/products.service.js";
import { EError } from "../enums/Eerror.js";
import { CustomError } from "../services/customError.service.js";
import { generateProductErrorInfo } from "../services/infoDictonary.js";

export class ProductsController {
    static getProducts = async (req, res) => {
        try {
            const products = await ProductsService.getProducts();
            res.json({ status: 'success', data: products });
        } catch (error) {
            const customError = new CustomError();
            const errorMessage = customError.createError({
                name: "Error",
                cause: error,
                message: "Error al obtener productos",
                errorCode: EError.DATABASE_ERROR
            });
            res.status(500).json({ error: errorMessage });
        }
    }

    static getProductById = async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await ProductsService.getProductById(productId);
            res.json({ message: "Endpoint para obtener producto", data: product });
        } catch (error) {
            const customError = new CustomError();
            const errorMessage = customError.createError({
                name: "Error",
                cause: error,
                message: "Error al obtener producto por ID",
                errorCode: EError.DATABASE_ERROR
            });
            res.status(500).json({ error: errorMessage });
        }
    }

    static createProduct = async (req, res) => {
        try {
            const product = req.body;
            const result = await ProductsService.createProduct(product);
            res.json({ status: 'success', data: result });
        } catch (error) {
            const customError = new CustomError();
            const errorMessage = customError.createError({
                name: "ValidationError",
                cause: error,
                message: "Error al crear producto",
                errorCode: EError.INVALID_BODY_JSON
            });
            res.status(400).json({ error: errorMessage });
        }
    }

    static updateProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const updatedProductInfo = req.body;
            const updatedProduct = await ProductsService.updateProduct(productId, updatedProductInfo);
            res.json({ status: 'success', message: "Producto actualizado", data: updatedProduct });
        } catch (error) {
            const customError = new CustomError();
            const errorMessage = customError.createError({
                name: "Error",
                cause: error,
                message: "Error al actualizar producto",
                errorCode: EError.DATABASE_ERROR
            });
            res.status(500).json({ error: errorMessage });
        }
    }

    static deleteProductById = async (req, res) => {
        try {
            const productId = req.params.pid;
            await ProductsService.deleteProduct(productId);
            res.json({ message: "Producto eliminado con éxito" });
        } catch (error) {
            const customError = new CustomError();
            const errorMessage = customError.createError({
                name: "Error",
                cause: error,
                message: "Error al eliminar producto",
                errorCode: EError.DATABASE_ERROR
            });
            res.status(500).json({ error: errorMessage });
        }
    }
}
