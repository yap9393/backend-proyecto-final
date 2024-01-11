import mongoose from "mongoose";
import { config } from "../src/config/config.js";
import { productsModel } from "../src/dao/mongo/models/products.model.js";

await mongoose.connect(config.mongo.url);

const updateProducts = async()=>{
    try {
        const adminId = "65663cfb6f8808e88e33ffbb";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
};
updateProducts();