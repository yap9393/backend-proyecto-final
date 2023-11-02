import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
// import { generateToken } from "./utils.js";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("__dirname", __dirname) //C:\Users\yap_1\Desktop\CODERHOUSE\backend\Primer pre entrega - proyecto\src

const storage = multer.diskStorage({
    //destination:carpeta donde se guardan los archivos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./public/img"))
    },
    // filename:con que nombre vamos a guardar el archivo
    filename: function (req, file, cb) {
        cb(null, `${req.body.title}-${file.originalname}`)
    }
});

//funcion middleware para subir las imagenes, que utilizaremos en las diferentes rutas
export const uploader = multer({ storage });

// funcion para encriptar contrasenias 
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

// funcion que compara contrasenias encriptadas.
export const inValidPassword =(password, user ) =>{
    return bcrypt.compareSync(password, user.password)
}

//json token
const PRIVATE_KEY="coderSecretToken";

export const generateToken = (user)=>{
    const token=jwt.sign({name:user.name,email:user.email},PRIVATE_KEY,{expiresIn:"24h"});
    return token;
}

export const validateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    if(!authHeader) return res.sendStatus(401);

    //se hace el split ya que el token viene en el header de la siguiente manera: "Bearer <token>", y solo nos interesa el token
    const token = authHeader.split(" ")[1];
    // console.log(token);

    if(token === null) return res.sendStatus(401);

    //jwt.verify toma como argumentos:
    //1. El token recibido
    //2. La clave privada, que es la que usamos antes para firmar el token.
    //3. Un callback que se ejecutará cuando el token sea verificado.
    //De esta manera verificamos que el token sea válido y que no haya sido modificado externamente, y lo agregamos al objeto request para que pueda ser usado en las rutas.
    jwt.verify(token,PRIVATE_KEY,(err,payload)=>{
        if(err) return res.sendStatus(403);
        req.user = payload;
        next();
    });
};