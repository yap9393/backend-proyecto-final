import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:String,
    email: {
        type: String,
        required:true,
        unique: true
    },
    age:Number,
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user' 
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'carts'
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema);