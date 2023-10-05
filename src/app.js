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
// import chatRouter from "./routes/chat.routes.js";

const port = 8080;
const app = express()

app.use(express.json()); //primer middleware para convertir lo del body a json, tb conocido como middleware de aplicacion, se ejcuta en toda mi aplicacion.
app.use(express.urlencoded({ extended: true }));  //me permite recibir inputs de formularios y q los comprenda como json

//servidor
const httpServer = app.listen(port, () => console.log(`servidor ejecutandose en el puerto ${port}`))

//servidor de websocket
const io = new Server(httpServer)

//carpeta public 
app.use('/static', express.static(path.join(__dirname, '/public')))

//configuracion del motor de plantillas handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));


//rutas
app.use(viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
// app.use('/api/chat', chatRouter);

const chat=[]
//socket server
io.on('connection', async (socket) => {
    console.log('cliente conectado');
    const products = await productsService.getProducts();
    socket.emit('productsArray', products)

     //recibir lo enviado por el socket del cliente
     socket.on("addProduct", async (productData) => {

        const result = await productsService.createProducts(productData);
        const products = await productsService.getProducts();
        io.emit('productsArray', products)
    })

    // manejar la solicitud para eliminar un producto
    socket.on('deleteProduct', async (productId) => {
        const deletedProductId = await productsService.deleteProduct(productId);
        if (deletedProductId) {
            io.emit('productDeleted', deletedProductId);
        }
    });
    //chat -->
     //historial
     socket.emit('chatHistory', chat) //cuando el usuario se conecta recibe todo el historial 
     //recibimos cada mensaje
     socket.on('msgChat',(data)=>{
         chat.push(data);
         //enviamos el historial del chat a los usuarios conectados.
         io.emit('chatHistory', chat)
     })
     //recibimos mensaje de conexion de nuevo cliente:
     socket.on('authenticated', (data)=>{
         socket.broadcast.emit('newUser',`el usuario ${data} se acaba de conectar`)
     })
});

// conexion base de datos
connectDB();