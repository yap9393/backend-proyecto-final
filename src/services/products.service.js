import {productsDao} from '../dao/index.js'
  
export class ProductsService {
    static getProducts = () => {
        return productsDao.getProducts();
    }
    static createProduct = (productInfo) => {
        return productsDao.createProduct(productInfo)
    }
    static getProductById = (productId) => {
        return productsDao.getProductById(productId)
    }
    static getProductsPaginate = (query, options) => {
        return productsDao.getProductsPaginate(query, options)
    }
    static updateProduct = (productId, newProductInfo) => {
        return productsDao.updateProduct(productId, newProductInfo)
    }
    static deleteProduct = (productId) => {
        return productsDao.deleteProduct(productId);
    }
}

