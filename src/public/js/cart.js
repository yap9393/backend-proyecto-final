const socketClient = io();
const cartList = document.getElementById("cartList");

// recibir los productos del carrito
socketClient.on('cartUpdated', (cartProducts) => {
    updateCartList(cartProducts);
});

// actualizar la lista de productos en el carrito en la interfaz de usuario
const updateCartList = (cartProducts) => {
    let cartElements = "";

    if (cartProducts && cartProducts.products && Array.isArray(cartProducts.products)) {
        cartProducts.products.forEach(cartItem => {
            if (cartItem && cartItem.productId) {
                // Asegurar que las propiedades necesarias estén presentes
                const { _id, title, description, price, quantity } = cartItem.productId;

                cartElements +=
                    `<li id="cartItem_${_id}">
                        <h3>${title}</h3>
                        <p>Descripción: ${description}</p>
                        <p>Precio: $${price}</p>
                        <p>Cantidad: ${quantity}</p>
                        <button onclick="deleteProduct('${_id}')">Eliminar del carrito</button>
                    </li>`;
            }
        });
    } else {
        console.error("El objeto cartProducts no tiene la estructura esperada:", cartProducts);
    }

    cartList.innerHTML = cartElements;
};


// eliminar un producto del carrito por su ID
const deleteProduct = (productId) => {
    socketClient.emit('deleteFromCart', productId);
};
