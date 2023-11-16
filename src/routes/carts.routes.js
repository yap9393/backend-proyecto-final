import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
 
const router = Router();

router.get("/", cartsController.getCarts)
router.get("/:cid", cartsController.getCartById);
router.post("/", cartsController.createCarts);
router.put("/:cid/product/:pid", cartsController.addProductById);
router.put("/:cid/products/:pid", cartsController.addQuantity);//agrego en body mas quantity
router.delete("/:cid/products/:pid", cartsController.deleteProducts);
router.delete("/:cid", cartsController.deleteCartById);

export { router as cartsRouter };



// ruta para agregar un producto a un carrito o incrementar su cantidad
// router.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         const cid = req.params.cid; // obtener el paramoetro cid de la URL (ID del carrit)
//         const pid = req.params.pid; // obtener el parametro pid de la URL (ID del producto)
//         const carts = await cartsService.getCarts();
//         const cart = carts.find((cart) => cart.id === parseInt(cid)); // buscar el carrito por ID
//         if (!cart) {
//             return res.status(404).json({ error: "Carrito no encontrado" });
//         }
//         // obtener el producto con el ID proporcionado
//         const products = await productsService.getProducts();
//         const product = products.find((product) => product.id === parseInt(pid));
//         if (!product) {
//             return res.status(404).json({ error: "Producto no encontrado" });
//         }
//         const productToAdd = cart.products.find((product) => product.product === parseInt(pid)); // buscar el producto en el carrito
//         if (productToAdd) {
//             // si ya existe en el carrito incrementar la cantidad
//             productToAdd.quantity++;
//         } else {
//             // si no existe en el carrito agregarlo
//             cart.products.push({ product: parseInt(pid), quantity: 1 });
//         }
//         // actualizar el carrito en el archivo
//         await cartsService.saveCart(cart);
//         res.json({ data: cart });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
