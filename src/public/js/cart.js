const deleteProduct = async (productId) => {
    let cartId = '6526e7dea74bed07729fdca3'; // hardcodeado , modificar 
    console.log(productId)
    if (!cartId) {
        console.log('No se puede eliminar el producto del carrito porque no se encontró un carrito.');
        return;
    }
    // enviar una solicitud al servidor para eliminar el producto del carrito.
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
    });
    if (response.status === 200) {
        alert('Producto eliminado del carrito');
    } else {
        console.error('Error al eliminar el producto del carrito');
    }
};
