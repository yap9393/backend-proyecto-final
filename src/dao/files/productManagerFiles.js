import fs from 'fs';
import { logger } from '../../helpers/loggers.js';

export  class ProductsManagerFiles {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.lastProductId = 0;
        this.loadProducts();
    }
    fileExists(){
        return fs.existsSync(this.path);
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            this.products = [];
            this.lastProductId = 0;
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data, 'utf8');
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, status, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios.");
            throw new Error("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some(existingProduct => existingProduct.code === code)) {
            console.log("El código ya está en uso.");
            throw new Error("El código ya está en uso.");
            return;
        }
        const newProduct = {
            id: this.lastProductId + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            status:true,
            stock,
        };
        this.products.push(newProduct);
        this.lastProductId++;
        await this.saveProducts();
        console.log("Producto agregado:", newProduct);
    }

    async getProducts() {
        try {
         if(this.fileExists()){
             const contenidoString = await fs.promises.readFile(this.path,'utf-8');
             const products = JSON.parse(contenidoString)

             return this.products;
         }else{
             throw new Error('no se pudieron obtener el producto')
         }
          
        } catch (error) {
            logger.error('Error al obtener productos');
        }
     }
     async getProductById(id) {
        try {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            logger.info('Producto no encontrado');
        } 
        } catch (error) {
            logger.error('Error al obtener producto por Id');
            throw error;
        }
        //en el after del 9-06 muestra como hacer esta funcion asincrona 
        //probe su forma de hacerlo y no me anda
    }
    //  async getProductById(id) {
    //     try {
    //         if (this.fileExists()) {
    //             const contenidoString = await fs.promises.readFile(this.path, 'utf-8');
    //             console.log("la ruta del path es " + this.path)
    //             const products = JSON.parse(contenidoString);
    //             const product = products.find(p => p.id === id);
    //             if (!product) {
    //                 throw new Error("El producto no existe");
    //             }
    //             return product;
    //         } else {
    //             throw new Error('no se pudo obtener el producto');
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
    

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updatedFields,
                id: this.products[productIndex].id,
            };
            await this.saveProducts();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            logger.info('Producto no encontrado ');
        }
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            await this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            logger.info('Producto no encontrado ');
        }
    }

    async createProducts(productInfo){
        try {
           if(this.fileExists()){
            const contenidoString=await fs.promises.readFile(this.path, 'utf-8');
            const products=JSON.parse(contenidoString);
            let newId=1;
            if(products.length>0){
                newId=products[products.length-1].id+1
            }
            productInfo.id=newId;
            products.push(productInfo);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return 'producto agregado'
        }else {
            throw new Error('no se pudieron obtener los productos')
        }  
        } catch (error) {
            throw error
        }
    }
}