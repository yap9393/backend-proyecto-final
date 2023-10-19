import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import path from 'path'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { productsService } from "./dao/index.js";
import { connectDB } from "./config/dbConnection.js";
import chatRouter from "./routes/chat.routes.js";
import { productsModel } from "./dao/mongo/models/products.model.js";
import cookieParser from 'cookie-parser'
import { usersRouter } from "./routes/users.routes.js";
import session from 'express-session'
import { sessionsRouter } from "./routes/session.routes.js";
import MongoStore from 'connect-mongo'
// import { chatService } from "./dao/index.js";

import mongoose from "mongoose";

const port = 8080;
const app = express()

//middlewares
app.use(express.json()); //primer middleware para convertir lo del body a json, tb conocido como middleware de aplicacion, se ejcuta en toda mi aplicacion.
app.use(express.urlencoded({ extended: true }));  //me permite recibir inputs de formularios y q los comprenda como json
app.use(cookieParser('claveCookies')) //cookies

//session
app.use(session({
    store:MongoStore.create({
        ttl:3000,
        mongoUrl:'mongodb+srv://yap1993:VzyqidXjZVTMtjK7@cluster0.dq2dywq.mongodb.net/ecommerce?retryWrites=true&w=majority',
    }),
    secret:'claveProyectoCoder',
    resave:true,
    saveUninitialized:true
}))

// app.get('/login', (req,res)=>{
//     const {name}=req.query;
//     req.session.user=name;
//     res.send('login y sesion creada en archivos.')
// })

// app.get('/profile',(req,res)=>{
//     if(req.session.user){
//         res.send(`bienvenido ${req.session.user}`)
//     }else{
//         res.send('debes iniciar sesion')
//     }
// })

//servidor
const httpServer = app.listen(port, () => console.log(`servidor ejecutandose en el puerto ${port}`))



//servidor de websocket
const io = new Server(httpServer)

//carpeta public 
app.use('/static', express.static(path.join(__dirname, '/public')))

//configuracion del motor de plantillas handlebars
app.engine('.hbs', engine({ extname: '.hbs'
//esto es la otra opcion a poner .lean() para obtener los productos del carrito)
// , runtimeOptions: { 
//     allowProtoMethodsByDefault: true,
//     allowProtoPropertiesByDefault: true,
// },
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));


//rutas
app.use(viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionsRouter)

// app.use('/api/chat', chatRouter);

// const chat=[]

//socket server
io.on('connection', async (socket) => {
    console.log('cliente conectado');
    const products = await productsService.getProducts();
    socket.emit('productsArray', products)

     //recibir lo enviado por el socket del cliente
     socket.on("addProduct", async (productData) => {

        const result = await productsService.createProduct(productData);
        const products = await productsService.getProducts();
        io.emit('productsArray', products)
    })

    // manejar la solicitud para eliminar un producto
    socket.on('deleteProduct', async (productId) => {
        try {
            await productsService.deleteProduct(productId);
            const updatedProducts = await productsService.getProducts();
            socket.emit('productsArray', updatedProducts);
        } catch (error) {
            console.error('Error al eliminar un producto:', error.message);
        }
    });
});

// conexion base de datos
connectDB();

