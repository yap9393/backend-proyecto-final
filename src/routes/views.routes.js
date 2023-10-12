import { Router } from "express";
import { productsService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";

const router = Router();
router.get('/', async (req,res)=>{
    res.render('home')
})
router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort="none" } = req.query;
    const query = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    const options = {
        limit,
        page,
        lean: true,
    };
    
    if (sort === 'asc') {
        options.sort = { price: 1 }; 
    } else if (sort === 'desc') {
        options.sort = { price: -1 };
    }
 
    const result = await productsService.getProductsPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes("page") ?
            baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
    }
    res.render('products', dataProducts);
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/cart', async (req, res) => {
    const cartId = '6526e7dea74bed07729fdca3'; //carrito hardcodeado. mas adelante va a ser cambiado por uno dinamico.
    try {
        const cart = await cartsService.getCartById(cartId);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        res.render('cart', { products: cart.products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al obtener el carrito');
    }
});


export { router as viewsRouter }