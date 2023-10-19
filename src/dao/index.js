import { ProductsManagerFiles } from "./files/productManagerFiles.js";
import { CartsManagerFiles } from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import{ChatManagerMongo} from "./mongo/chatManagerMongo.js";
// import { usersManagerMongo } from "./mongo/usersManagerMongo.js";

// export const productsService = new ProductsManagerFiles(path.join(__dirname,"/files/products.json"));
// export const cartsService=new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));


export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService= new ChatManagerMongo();
