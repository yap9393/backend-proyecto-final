import { Router } from "express";
import { productsService } from "../dao/index.js";

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
    
    router.get('/chat',(req,res)=>{
        res.render('chat');
    })

export {router as viewsRouter}