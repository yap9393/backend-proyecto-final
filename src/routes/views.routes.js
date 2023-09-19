import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router=Router();

router.get('/', async(req,res)=>{
        const products=await productsService.getProducts();
        res.render('home', {products});
    });
    
    router.get('/realtimeproducts', (req,res)=>{
        res.render('realTimeProducts');
    });
    
    router.get('/addproducts',(req,res)=>{
        res.render('addproducts');
    });

export {router as viewsRouter}