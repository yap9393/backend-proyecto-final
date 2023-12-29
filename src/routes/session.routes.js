

import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionController } from "../controllers/session.controller.js";

const router = Router(); 
 
router.post("/signup", SessionController.signUp);


router.get("/fail-signup", SessionController.failSignUp);
 
//Ruta de solicitud registro con github
router.get("/signup-github", SessionController.githubSignup);

//ruta del callback con github
// router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{ //por algun motivo, la variable config.github.callbackUrl me agrega la ruta de localhost:8080.... en vez de mostrame solo/github-callback como deberia. Por eso al hacerlo de esta forma me da error. 
router.get("/github-callback", passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), (req, res) => {
    res.redirect("/profile");
}); 

router.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}) , SessionController.redirecProfile);

router.get("/fail-login", SessionController.failLogin);


router.get("/logout", SessionController.logout);

router.post("/forgot-password", SessionController.forgotPassword);

router.post("/reset-password", SessionController.resetPassword);

export { router as sessionsRouter };



//version del router.post anterior a la implementacion de passport, q verifica admin antes de continuar
// const adminUser = {
//     email: 'adminCoder@coder.com',
//     password: 'adminCod3r123',
//     role: 'admin'
// };
// router.post('/login', async (req, res) => {
//     try {
//         const loginForm = req.body;
//         // verifica si el usuario que intenta iniciar sesion es el administrador
//         if (loginForm.email === adminUser.email && loginForm.password === adminUser.password) {
//             req.session.email = adminUser.email;
//             req.session.role = adminUser.role;
//             return res.redirect('/products');
//         }
//         // si no es el administrador, verifica si el usuario existe en la base de datos
//         const user = await usersModel.findOne({ email: loginForm.email });
//         if (!user) {
//             return res.render('loginView', { error: 'Este usuario no está registrado' });
//         }
//         // if (user.password !== loginForm.password) {
//         if (!isValidPassword(loginForm.password,user)) {
//             return res.render('loginView', { error: 'Credenciales inválidas' });
//         }
//         req.session.email = user.email;
//         req.session.role = user.role;
//         res.redirect('/products');
//     } catch (error) {
//         res.render('loginView', { error: 'No se pudo iniciar sesión para este usuario' });
//     }
// });

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