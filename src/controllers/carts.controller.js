import { CartsService } from "../services/carts.service.js";
import { logger } from "../helpers/loggers.js";

export class CartsController {
    static getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts();
            res.json({ data: carts });
        } catch (error) {
            logger.error('Error en getCarts controller', error.message);
            res.status(500).json({ error: 'Error al obtener los carritos.' });
        }
    }

    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json({ status: "success", data: cart });
        } catch (error) {
            logger.error('Error en getCartById controller', error.message);
            res.json({ error: error.message });
        }
    }

    static createCarts = async (req, res) => {
        try {
            const cartCreated = await CartsService.createCart();
            res.json({ status: "success", data: cartCreated });
        } catch (error) {
            logger.error('Error en createCarts controller', error.message);
            res.json({ status: "error", error: error.message });
        }
    }

    static addProductById = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.addProduct(cartId, productId);
            res.json({ status: "success", result });
        } catch (error) {
            logger.error('Error en addProductById controller', error.message);
            res.json({ error: error.message });
        }
    }

    static addQuantity = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const { newQuantity } = req.body;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProductCart(cartId, productId, newQuantity);
            const updatedCart = await CartsService.getCartById(cartId);
            res.json({ status: "success", result, updatedCart });
        } catch (error) {
            logger.error('Error en addQuantity controller', error.message);
            res.json({ error: error.message });
        }
    }

    static deleteProducts = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.deleteProduct(cartId, productId);
            const updatedCart = await CartsService.getCartById(cartId);
            res.json({ status: "success", result, updatedCart });
        } catch (error) {
            logger.error('Error en deleteProducts controller', error.message);
            res.json({ error: error.message });
        }
    }

    static deleteCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.deleteAllProducts(cartId);
            res.json({ status: "success", result });
        } catch (error) {
            logger.error('Error en deleteCartById controller', error.message);
            res.json({ error: error.message });
        }
    }

    static purchaseCart = async (req, res) => {
        try {
            console.log('purchaseCart controller');
            const { cid: idCarts } = req.params;
            const cart = await CartsService.getCartsId(idCarts);

            if (cart.products.length) {
                // ... Código del controlador para la compra ...
            } else {
                logger.error('El carrito no tiene productos');
                res.json({ status: "error", message: "El carrito no tiene productos" });
            }
        } catch (error) {
            logger.error('Error en purchaseCart controller', error.message);
            res.json({ status: "error", message: error.message });
        }
    }
}
