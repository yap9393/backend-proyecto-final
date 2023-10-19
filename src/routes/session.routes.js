import { Router } from "express";
import { usersModel } from "../dao/mongo/models/users.model.js";


const router = Router();


router.post("/signup", async(req, res) => {
    try {
        const signupForm = req.body;
        const result = await usersModel.create(signupForm);
        res.render("loginView", { message: "Usuario registrado correctamente" });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // el codigo 11000 indica ya hay un usuario con ese correo y no permite duplicados de ese campo.
            res.render("signupView", { error: "El correo electrónico ya está registrado" });
        } else {
            res.render("signupView", { error: "No se pudo registrar el usuario" });
        }
    }
});
 

const adminUser = {
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    role: 'admin'
};

router.post('/login', async (req, res) => {
    try {
        const loginForm = req.body;
        // verifica si el usuario que intenta iniciar sesion es el administrador
        if (loginForm.email === adminUser.email && loginForm.password === adminUser.password) {
            req.session.email = adminUser.email;
            req.session.role = adminUser.role;
            return res.redirect('/products');
        }
        // si no es el administrador, verifica si el usuario existe en la base de datos
        const user = await usersModel.findOne({ email: loginForm.email });
        if (!user) {
            return res.render('loginView', { error: 'Este usuario no está registrado' });
        }
        if (user.password !== loginForm.password) {
            return res.render('loginView', { error: 'Credenciales inválidas' });
        }
        req.session.email = user.email;
        req.session.role = user.role;
        res.redirect('/products');
    } catch (error) {
        res.render('loginView', { error: 'No se pudo iniciar sesión para este usuario' });
    }
});

////version del router.post SIN usuario de Admin viviendo en el codigo y no en BD:
// router.post("/login", async(req,res)=>{
//     try {
//         const loginForm = req.body;
//         const user = await usersModel.findOne({email:loginForm.email});
//         if(!user){
//             return res.render("loginView",{error:"Este usuario no esta registrado"});
//         }
//         //verificar contraseña
//         if(user.password !== loginForm.password){
//             return res.render("loginView",{error:"Credenciales invalidas"});
//         }
//         //ususario existe y contraseña valida, entonces creamos la session del usuario
//         req.session.email = user.email;
//         req.session.role = user.role;
//         res.redirect("/products");
//     } catch (error) {
//         res.render("loginView",{error:"No se pudo iniciar sesion para este usuario"});
//     }
// });

router.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});

export {router as sessionsRouter};