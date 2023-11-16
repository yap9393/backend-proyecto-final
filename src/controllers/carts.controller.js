
import { CartsService } from "../services/carts.service.js";

export class cartsController {
    static getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts();
            res.json({ data: carts })
        } catch (error) {
            res.json({ error: error.message })
        }
    }
    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json({ status: "success", data: cart });
        } catch (error) {
            res.json({ error: error.message });
        }
    }
    static createCarts =async (req, res) => {
        try {
            const cartCreated = await CartsService.createCart()
            res.json({ status: "success", data: cartCreated });
        } catch (error) {
            res.json({ status: "error", error: error.message });
        }
    }
    static addProductById =  async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const cart = await CartsService.getCartById(cartId);
            // const product = await productsService.getProductById(productId);
            const result = await cartsService.addProduct(cartId,productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    }
    static addQuantity = async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProductCart(cartId,productId,newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    }
    static deleteProducts=async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.deleteProduct(cartId, productId);
            res.json({ status: "success", result });
        } catch (error) {
            res.json({ error: error.message });
        }
    }
    static deleteCartById =  async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.deleteAllProducts(cartId);
            res.json({ status: "success", result });
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}
