const socketClient = io();
const productList = document.getElementById("productList");
const createProductForm = document.getElementById('createProductForm');
let dataProducts = []; // Variable global para almacenar los productos

// enviar la info del formulario al SOCKET del servidor
createProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    socketClient.emit('addProduct', jsonData);
    createProductForm.reset();
});

// recibir los productos
socketClient.on('productsArray', (newDataProducts) => {
    dataProducts = newDataProducts;
    updateProductList(dataProducts);
   
});

// actualizar la lista de productos en la interfaz de usuario
const updateProductList = (products) => {
    let productsElements = "";

    products.forEach(product => {
        productsElements +=
            `<div class="product-card">
                <div class="product-details">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                </div>
                <button class="delete-button" onClick='deleteProduct("${product.id}")'>Eliminar</button>
            </div>`;
    });

    productList.innerHTML = productsElements;
};

// eliminar un producto por su ID
const deleteProduct = (productId) => {
    socketClient.emit('deleteProduct', parseInt(productId));
};

// escuchar la respuesta del servidor despues de eliminar un producto
socketClient.on('productDeleted', (deletedProductId) => {
    // actualizar la lista de productos despues de la eliminacion
    dataProducts = dataProducts.filter(product => product.id !== deletedProductId);
    updateProductList(dataProducts);
});

