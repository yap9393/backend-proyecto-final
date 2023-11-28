import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
 import { isAuth,checkRole } from "../middlewares/auth.js";
const router = Router();

router.get("/", CartsController.getCarts)
router.get("/:cid", CartsController.getCartById);
router.post("/", CartsController.createCarts);
router.put("/:cid/product/:pid", isAuth, checkRole(['user']),  CartsController.addProductById);
router.put("/:cid/products/:pid", isAuth, checkRole(['user']), CartsController.addQuantity);//agrego en body mas quantity
router.delete("/:cid/products/:pid", CartsController.deleteProducts);
router.delete("/:cid", CartsController.deleteCartById);
router.post('/cid/purchase', CartsController.purchaseCart);

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
