import { __dirname } from "../utils.js ";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Documentacion api de app de productos de ski.",
            version:"1.0.0",
            description:"Definición de endpoints para la API de productos"
        },
    },
    apis:[`${path.join(__dirname,"../docs/**/*.yaml")}`],//redirige a todos los archivos en las carpetas dentro de /docs
};

//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecs = swaggerJsDoc(swaggerOptions);