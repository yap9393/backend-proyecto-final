
const addToCart = async (productId) => {
    let cartId = '6526e7dea74bed07729fdca3'; 
    console.log(productId)
    if (!cartId) {
        console.log('No hay un carrito existente.');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const responseCheck = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'GET',
    });

    if (responseCheck.status === 200) {
        // El producto ya existe en el carrito, obtener la cantidad actual
        const responseGetQuantity = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'GET',
        });

        if (responseGetQuantity.status === 200) {
            const productData = await responseGetQuantity.json();
            const currentQuantity = productData.quantity;
            const newQuantity = currentQuantity + 1;

            // Actualizar la cantidad en el carrito
            const responseUpdateQuantity = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify({ newQuantity }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (responseUpdateQuantity.status === 200) {
                alert('Producto REPETIDO agregado al carrito');
                console.log('Producto agregado al carrito');
            } else {
                console.error('Error al agregar el producto al carrito');
            }
        } else {
            console.error('Error al obtener la cantidad del producto en el carrito');
        }
    } else {
        // El producto no existe en el carrito, agregarlo
        const responseAddProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'PUT',
        });

        if (responseAddProduct.status === 200) {
            alert('Producto NUEVO agregado al carrito');
        } else {
            console.error('Error al agregar el producto al carrito');
        }
    }
};
