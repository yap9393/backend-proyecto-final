import { ProductsManagerFiles } from "./files/productManagerFiles.js";
import { CartsManagerFiles } from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";
console.log("dirname :", path.join(__dirname,"/files"))

export const productsService = new ProductsManagerFiles(path.join(__dirname,"/files/products.json"));
export const cartsService=new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));

console.log("la ruta a la que esta ccediendo es  " + path.join(__dirname,"/files/products.json"))