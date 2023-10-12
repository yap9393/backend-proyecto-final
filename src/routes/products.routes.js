import { Router } from "express";
import { productsService } from "../dao/index.js";
import { uploader } from "../utils.js";

const router = Router();


//le doy el endpoint http://localhost:8080/api/products
router.get("/", async (req, res) => {
    try {
        const products = await productsService.getProducts(); 
        res.json({ status: 'success', data:products });
        // res.render('home',products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//obtiene el producto por ID
router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({ message: "Endpoint para obtener producto", data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }

});

router.post('/',async (req,res)=>{
    try {
        const product=req.body;
        const result = await productsService.createProducts(product);
        res.json({ status: 'success', data: result })
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

// actualiza un producto por su ID
router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProductInfo = req.body;
        const updatedProduct = await productsService.updateProduct(productId, updatedProductInfo);
        res.json({ status:'success', message: "Producto actualizado", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// elimina un producto por su ID
router.delete("/:pid", async (req, res) => {
    try {
        const productId =req.params.pid;
        await productsService.deleteProduct(productId);
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export { router as productsRouter };

// router.post("/", uploader.single('file'), async (req, res) => {
//     try {
//         const productInfo = req.body;
//         const thumbnailFilename = req.file.filename; // Nombre del archivo de la imagen cargada por multer NOMBRE DE ARCHIVO
//         // const thumbnailFilename = req.file.destination; // Nombre del archivo de la imagen cargada por multer DESTINO
//         productInfo.thumbnail = thumbnailFilename; // Establece el nombre de archivo como el thumbnail
//         const newProductMade = await productsService.addProduct(productInfo);
//         res.json({ message: "Producto creado", data: newProductMade });
//         console.log('req.file:'+req.file)
//     } catch (error) {
//         res.status(400).json({ status: "error", message: error.message });
//     }
// });
//middleware de router
// router.use(function (req,res,next){
//     console.log('peticion de router products recibida.')
//     next();
// })

//middleware de endpoint: (luego utilizo la funcion IsAdmin en cada ruta despues de la ruta ej router.post("/",IsAdmin,async...))
// const userRole='admin'
// const IsAdmin = (req,res,next)=>{
//     if(userRole==='user'){
//         res.send('no tienes permisos')
//     }else{
//         next()
//     }
// }
