import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";

const router = Router();

router.get('/', viewsController.view);

router.get('/products', viewsController.productsView);
 
router.get('/realtimeproducts', viewsController.realTimeProducts);

router.get('/cart', viewsController.cartsView);

//vistas de session
router.get("/profile",viewsController.profileView);

router.get('/login', viewsController.loginView);

router.get('/signup', viewsController.signUpView);

//mocking
router.get('/mokingProducts', viewsController.mockingProducts)

router.get("/forgot-password", (req,res)=>{
    res.render("forgotPassView");
});

export { router as viewsRouter }