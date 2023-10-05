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

    async createCart(cartInfo) {
        try {
            const result = await this.model.create(cartInfo);
            return result;
        } catch (error) {
            console.log("createCart", error.message);
            throw new Error('No se pudo crear el carrito de compras.');
        }
    };

    async addProduct( productId) { //agregar cartId
        try {
            const result = await this.model.create(productId)
            return result;
        } catch (error) {
            console.log("addProduct", error.message)
            throw new Error('No se pudo agregar el producto al carrito')
        }

        //si necesito obtener el carrito antes usar esta de abajo
        // try {
        //     const cart = await this.model.findById(cartId);
        //     if (!cart) {
        //         throw new Error('No se encontró el carrito de compras.');
        //     }
        //     cart.products.push(productId);
        //     const result = await cart.save();
        //     return result;
        // } catch (error) {
        //     console.log("addProduct", error.message);
        //     throw new Error('No se pudo agregar el producto al carrito.');
        // }
    };
    
};
