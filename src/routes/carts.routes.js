import {Router} from "express";
import { cartsService, productsService} from "../persistence/index.js";


const router = Router();

//le doy el endpoint http://localhost:8080/api/carts
router.get("/",async (req,res)=>{
    try {
        const carts= await cartsService.getCarts();
        res.json({data:carts})
    } catch (error) {
        res.json({error:error.message})
    }
})

// ruta para crear carritos.
router.post("/", async (req, res) => {
    try {
     const cartCreated= await cartsService.createCart()
     res.json({data:cartCreated});

    } catch (error) {
        res.json({error: error.message });
    }
});

// ruta para obtener los productos de un carrito especifico por su ID (cid)
router.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid; // Obtener el parametro cid de la URL
        const carts = await cartsService.getCarts();
        const cart = carts.find((cart) => cart.id === parseInt(cid)); // buscar el carrito por ID

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" }); 
            
        }
        const products = cart.products; // Obtener los productos del carrito
        res.json({ data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ruta para agregar un producto a un carrito o incrementar su cantidad
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid; // Obtener el parametro cid de la URL (ID del carrito)
        const pid = req.params.pid; // Obtener el parametro pid de la URL (ID del producto)
        const carts = await cartsService.getCarts();
        const cart = carts.find((cart) => cart.id === parseInt(cid)); // buscar el carrito por ID
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // Obtener el producto con el ID proporcionado
        const products = await productsService.getProducts(); 
        const product = products.find((product) => product.id === parseInt(pid));

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const productToAdd = cart.products.find((product) => product.product === parseInt(pid)); // buscar el producto en el carrito
        if (productToAdd) {
            // si ya existe en el carrito incrementar la cantidad
            productToAdd.quantity++;
        } else {
            // si no existe en el carrito agregarlo
            cart.products.push({ product: parseInt(pid), quantity: 1 });
        }
        // actualizar el carrito en el archivo
        await cartsService.saveCart(cart);
        res.json({ data: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export{router as cartsRouter};