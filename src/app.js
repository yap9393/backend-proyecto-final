import express from "express";
import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";
// import {__dirname } from "./utils.js";


const port=8080;
const app= express()

app.use(express.json());
app.listen(port,()=>console.log(`servidor ejecutandose en el puerto ${port}`))

//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)