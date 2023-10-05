import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://yap1993:VzyqidXjZVTMtjK7@cluster0.dq2dywq.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('base de datos conectada exitosamente')
    } catch (error) {
        console.log(`error al conectar la base de datos ${error.message} `)
    }
};
