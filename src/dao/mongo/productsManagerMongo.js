import { productsModel } from "./models/products.model.js";
import { logger } from "../../helpers/loggers.js";

export class ProductsManagerMongo {
    constructor() {
        this.model = productsModel;
    }

    async createProduct(productInfo) {
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            logger.error('createProduct', error.message);
            throw new Error('No se pudo crear el producto.');
        }
    }

    async getProducts() {
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            logger.error('getProducts', error.message);
            throw new Error('No se pudo obtener el listado de productos.');
        }
    }

    async getProductsPaginate(query, options) {
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            logger.error('getProducts', error.message);
            throw new Error('No se pudo obtener el listado de productos.');
        }
    }

    async getProductById(productId) {
        try {
            const result = await this.model.findById(productId);
            return result;
        } catch (error) {
            logger.error('getProductById', error.message);
            throw new Error('No se pudo obtener ese producto.');
        }
    }

    async updateProduct(productId, newProductInfo) {
        try {
            const result = await this.model.findByIdAndUpdate(productId, newProductInfo, { new: true });
            if (!result) {
                throw new Error('No se pudo encontrar el producto a actualizar.');
            }
            return result;
        } catch (error) {
            logger.error('updateProduct', error.message);
            throw new Error('No se pudo actualizar ese producto.');
        }
    }

    async deleteProduct(productId) {
        try {
            const result = await this.model.findByIdAndDelete(productId);
            if (!result) {
                throw new Error('No se pudo encontrar el producto a eliminar.');
            }
            return result;
        } catch (error) {
            logger.error('deleteProduct', error.message);
            throw new Error('No se pudo eliminar ese producto.');
        }
    }
}
