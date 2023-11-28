
import passport from "passport";
import { config } from "../config/config.js";
 import { ProductsService } from "../services/products.service.js";
 
export class SessionController {
    static signUp = passport.authenticate("signupLocalStrategy", {
        failureRedirect: "/api/sessions/fail-signup"
    });
    
    static failSignUp = (req, res) => {
        res.render("signupView", { error: "No se pudo registrar el usuario" });
    }

    static githubSignup = passport.authenticate("signupGithubStrategy");

    static githubCallback = passport.authenticate("signupGithubStrategy", {
        failureRedirect: "/api/sessions/fail-signup"
    }, (req, res) => {
        res.redirect("/profile");
        console.log(config.github.callbackUrl)
    }); 

    static redirecProfile = (req,res)=>{
        res.redirect("/profile")
    };


    static failLogin = (req, res) => {
        res.render("loginView", { error: "No se pudo iniciar sesion para este usuario" });
    };

    static logout = async (req, res) => {
        try {
            req.session.destroy(err => {
                if (err) {
                    res.render("profileView", { error: "No se pudo cerrar la sesión" });
                } else {
                    res.redirect("/");
                }
            });
        } catch (error) {
            res.render("signupView", { error: "No se pudo registrar el usuario" });
        }
    };
}
