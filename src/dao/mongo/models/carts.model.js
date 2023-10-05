import mongoose from "mongoose";

const cartsCollection='carts';

const cartsSchema=new mongoose.Schema({
    products:{
        type:[
            {
                productId:String,
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ],
        default:[]
    }
});  

export const cartsModel=mongoose.model(cartsCollection,cartsSchema)