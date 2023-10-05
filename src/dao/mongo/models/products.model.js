import mongoose from "mongoose"

const productsCollection='products'

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    code:{
        type:String,
        required:true,
        unique:true,
    }, 
    category:{
        type:String,
        required:true,
        enum:["Ski","Snowboard"]//con esto indico ESPECIFICAMENTE que valores puede tomar categoria
    },
    stock:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },

})

export const productsModel = mongoose.model(productsCollection, productSchema);