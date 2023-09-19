import path from 'path';
import {fileURLToPath} from 'url';
import multer from "multer";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("__dirname", __dirname) //C:\Users\yap_1\Desktop\CODERHOUSE\backend\Primer pre entrega - proyecto\src

const storage = multer.diskStorage({
    //destination:carpeta donde se guardan los archivos
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"./public/img"))
    },
    // filename:con que nombre vamos a guardar el archivo
    filename:function(req,file,cb){
        cb(null,`${req.body.title}-${file.originalname}`)
    }
});

//creamos la funcion middleware para subir las imagenes, que utilizaremos en las diferentes rutas
export const uploader = multer({storage});