import { Router } from "express";
import { cartsService, productsService } from "../dao/index.js";


const router = Router();

//le doy el endpoint http://localhost:8080/api/carts
router.get("/", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        res.json({ data: carts })
    } catch (error) {
        res.json({ error: error.message })
    }
})


// ruta para obtener los productos de un carrito especifico por su ID (cid)
router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        res.json({ status: "success", data: cart });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// ruta para crear carritos.
router.post("/", async (req, res) => {
    try {
        const cartCreated = await cartsService.createCart()
        res.json({ status: "success", data: cartCreated });
    } catch (error) {
        res.json({ status: "error", error: error.message });
    }
});

//agregar producto a carrito por id de prod y carrito
router.put("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid:cartId,pid:productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        // const product = await productsService.getProductById(productId);
        const result = await cartsService.addProduct(cartId,productId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

//agrego en body mas quantity
router.put("/:cid/products/:pid", async(req,res)=>{
    try {
        const {cid:cartId,pid:productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});




router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid: cartId, pid: productId } = req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.deleteProduct(cartId, productId);
        res.json({ status: "success", result });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await cartsService.deleteAllProducts(cartId);
        res.json({ status: "success", result });
    } catch (error) {
        res.json({ error: error.message });
    }
});



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
