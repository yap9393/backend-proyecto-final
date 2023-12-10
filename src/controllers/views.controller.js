
import { ProductsService } from "../services/products.service.js";
import { CartsService } from "../services/carts.service.js";
import { generateProduct } from "../helpers/mock.js";

export class viewsController{
    static view= async (req, res) => {
        res.redirect('/login');
    }
    static productsView= async (req, res) => {
        const { limit = 10, page = 1, sort = "none" } = req.query;
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
        
        let userEmail = null; // valor predeterminado es nulo
        let userRole=null;
        if (req.user?.email) {
            userEmail = req.user.email;
            userRole=req.user.role;
        }
        const result = await ProductsService.getProductsPaginate(query, options);
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
        
        res.render('products', { dataProducts, userEmail, userRole });
    }
    static realTimeProducts =(req, res) => {
        res.render('realTimeProducts');
    }
    static cartsView= async (req, res) => {
        const cartId = '6526e7dea74bed07729fdca3'; //carrito hardcodeado. mas adelante va a ser cambiado por uno dinamico.
        try {
            const cart = await CartsService.getCartById(cartId);
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
            res.render('cart', { products: cart.products });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al obtener el carrito');
        }
    }

    static profileView=(req,res)=>{
        if(req.user?.email){
            const userEmail = req.user.email;
            const userRole=req.user.role;
            const userName=req.user.first_name
            res.render("profileView",{userEmail, userRole,userName});
        } else {
            res.redirect("/login");
        }
    };

    static loginView= async (req, res) => {
        if (req.user?.email) {
            res.redirect('/profile');
        } else {
            res.render('loginView');
        }
    }
    static signUpView = async (req, res) => {
        res.render('signUpView');
    }
    static mockingProducts = async (req, res) => {
        try {
            let products = []
            for (let i = 0; i < 100; i++) {
                const items = generateProduct()
                products.push(items)
            }
            res.json({status: "success", data: products})
        } catch (error) {
            console.log('error mockingProducts controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    
}