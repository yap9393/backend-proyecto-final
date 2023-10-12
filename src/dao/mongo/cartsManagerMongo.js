import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo {
    constructor() {
        this.model = cartsModel;
    };

    async getCarts() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getCarts", error.message);
            throw new Error('No se pudo obtener la lista de carritos.');
        }
    };

    async getCartById(cartId) {
        try {
            const result = await cartsModel.findById(cartId).populate('products.productId').lean();
            if (!result) {
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            }
            return result
        } catch (error) {
            console.log('getCartsById', error.message)
            throw new Error('no se pudo obtener el carrito')
        }
    }

    async createCart() {
        try {
            const newCart = {}
            const result = await cartsModel.create(newCart);
            return result;
        } catch (error) {
            console.log("createCart", error.message);
            throw new Error('No se pudo crear el carrito de compras.');
        }
    };


    async addProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            // const productExist = cart.products.find(elm=>elm.productId._id == productId);
            // console.log("productExist",productExist);
            const newProductCart = {
                productId: productId,
                quantity: 1
            }
            cart.products.push(newProductCart);
            const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    };

    async deleteProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(elm => elm.productId._id == productId);
            if (productExist) {
                const newProducts = cart.products.filter(elm => elm.productId._id != productId);
                cart.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("deleteProduct", error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };
    
    async deleteAllProducts(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = [];
            const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
            return result;
        } catch (error) {
            console.log("deleteAllProducts", error.message);
            throw new Error("No se pudieron eliminar todos los productos del carrito");
        }
    };
    

    async updateProductCart(cartId, productId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(elm => elm.productId._id == productId);
            if (productIndex >= 0) {
                console.log(cart.products[productIndex])
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("updateProductCart", error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };
}
