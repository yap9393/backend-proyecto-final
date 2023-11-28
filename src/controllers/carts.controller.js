
import { CartsService } from "../services/carts.service.js";

export class CartsController {
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
            const result = await CartsService.addProduct(cartId,productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    }
    static addQuantity = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const { newQuantity } = req.body;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProductCart(cartId, productId, newQuantity);
            const updatedCart = await CartsService.getCartById(cartId); // Obtener el carrito actualizado
            res.json({ status: "success", result, updatedCart });
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    static deleteProducts = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.deleteProduct(cartId, productId);
            const updatedCart = await CartsService.getCartById(cartId); // Obtener el carrito actualizado
            res.json({ status: "success", result, updatedCart });
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
    
    static purchaseCart = async (req, res) => {
        try {
            console.log('purchaseCart controller');

            const { cid: idCarts } = req.params;;
            const cart = await CartsService.getCartsId(idCarts)

            if(cart.products.length){
                const ticketProducts = []
                const rejectedProducts = []
                //verifico el stock de cada producto
                for(let i = 0; i < cart.products.length; i++){

                    const cartProduct = cart.products[i]
                    console.log('Productos en carrito:', cartProduct);
                    const productInfo = cartProduct.productId
                    console.log('informacion del producto:', productInfo);

                    //comparo la quantity con el stock
                    if(cartProduct.quantity <= productInfo.stock){
                        //agrego el producto al tiket
                        ticketProducts.push(cartProduct)
                        //resto el stock del producto comprado
                        productInfo.stock -= cartProduct.quantity
                        //actualizo el stock en la 
                        //await ProductsService.updateProduct(productInfo, ticketProducts[i].productId)                        
                    }else{
                        //agrego los productos rechazados
                        rejectedProducts.push(cartProduct)
                    }
                }
                console.log('tiketProducts:', ticketProducts);
                console.log('rejectedProducts:', rejectedProducts);
                //calculo el total de la compra
                const total = ticketProducts.reduce((acc, item) => acc + item.quantity * item.productId.price, 0)

                const newTicket = {
                    code: uuidv4(), 
                    purchase_datetimr: new Date(),
                    amount: total,
                   // purchaser: req.user.email,
                }
                
                console.log('Compra realizada newTicket:', newTicket);
                const tiket = await TiketService.createTiket(newTicket);
                res.json({ status: "success", message: "Compra realizada", data: tiket });
                
            }else{
                console.log('Controller Purchase El carrito no tiene productos');
                res.json({ status: "error", message: "El carrito no tiene productos" });
            }
        }
        catch (error) {
            console.log('error purchaseCart controller', error.message);
            res.json({ status: "error",  message: error.message });
        } 
    }
}
