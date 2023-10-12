import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

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
        enum:["Ski","Snowboard"],//con esto indico ESPECIFICAMENTE que valores puede tomar categoria
        index:true
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
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);