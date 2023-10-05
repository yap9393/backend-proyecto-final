
import fs from 'fs';

export default class ProductManagerMemory {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.lastProductId = 0;
        this.loadProducts(); 
    }
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            this.products = [];
            this.lastProductId = 0;
        }
    }
    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }
    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some(existingProduct => existingProduct.code === code)) {
            console.log("El código ya está en uso.");
            return;
        }
        const newProduct = {
            id: this.lastProductId + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
        this.lastProductId++;
        this.saveProducts();
        console.log("Producto agregado:", newProduct);
    }
    
    fileExists(){
        return fs.existsSync(this.path)
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product);
            return product;
        } else {
            console.log('Producto no encontrado.');
        }
    }
    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex], //copio las propiedades del producto actual en el nuevo objeto
                ...updatedFields, //copio las propiedades del objeto updatedFields en el nuevo objeto
                id: this.products[productIndex].id, //me aseguro que id quede igual.
            };
            this.saveProducts();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.log('Producto no encontrado.');
        }
    }
    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.saveProducts(); 
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.log('Producto no encontrado.');
        }
    }
}

//test de entregable 2
// const manager1=new ProductManager("./productos.json"); //Se creará una instancia de la clase “ProductManager”
// console.log(manager1)
// manager1.getProducts() //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// manager1.addProduct({ //Se llamará al método “addProduct” con los campos:...
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "abc123",
//     stock: 25,
// })//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// manager1.getProducts() //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// manager1.addProduct({
//     title: "producto prueba 2",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "abc123",
//     stock: 25,
// });
// manager1.addProduct({
//     title: "producto prueba 3",
//     description: "Este es un producto prueba",
//     price: 100,
//     thumbnail: "Sin imagen",
//     code: "abc124",
//     stock: 15,
// });
// manager1.getProductById(1); //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado
// manager1.getProductById(2);
// manager1.getProducts();
// manager1.updateProduct(1, { price: 300 }); //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
// manager1.deleteProduct(2); //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir
// manager1.getProducts();