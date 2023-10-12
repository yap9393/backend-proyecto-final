const addToCart = async (productId) => {
    let cartId = '6526e7dea74bed07729fdca3'; // hardcodeado , modificar 

    if (!cartId) {
        console.log('No hay un carrito existente.');
        return;
    }
    // agrego el producto al carrito
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
    });

    if (response.status === 200) {
        alert('producto agregado al carrito')
        console.log('Producto agregado al carrito');
    } else {
        console.error('Error al agregar el producto al carrito');
    }
};