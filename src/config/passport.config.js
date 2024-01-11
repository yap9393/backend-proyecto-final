import passport from 'passport';
import localStrategy from 'passport-local';
import { createHash, inValidPassword } from '../utils.js';
import { usersModel } from '../dao/mongo/models/users.model.js';
import { config } from './config.js';
import GithubStrategy from "passport-github2"
import { usersDao } from '../dao/index.js';
import { logger } from '../helpers/loggers.js';

//localStrategy: username y password
export const initializePassport = ()=>{
    //Estrategia para registrar a los usuarios
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback:true,
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (req,username,password,done)=>{
            const {first_name, last_name, age} = req.body;
            try {
                console.log('Attempting to sign up user:', username);
                const user = await usersDao.getUserByEmail(username);
                if(user){
                    //el usuario ya esta registrado
                    return done(null,false);
                }
                //El usuario no esta registrado
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                console.log(newUser);
                const userCreated = await usersDao.createUser(newUser);
                if (!userCreated) {
                    return done(null, false, { message: 'Failed to create user.' });
                }
                
                // Log in the user using loginLocalStrategy
                req.login(userCreated, (err) => {
                    if (err) {
                        logger.error(err);
                        return done(err);
                    }
                    return done(null, userCreated);
                });
            } catch (error) {
                logger.error(error)
                return done(error);
            }
        }
    ));

    //Estrategia para login a los usuarios
    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (username,password,done)=>{
            try {
                const user = await usersDao.getUserByEmail(username);
                if(!user){
                    //el usuario no esta registrado
                    return done(null,false);
                }
                if(!inValidPassword(password,user)){
                    return done(null,false);
                }
                //validamos que el usuario esta registrado y que la contrasea es correcta
                return done(null,user);
            } catch (error) {
                logger.error(error)
                return done(error);
            }
        }
    ));

    //Estrategia de registro con github
    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            // callbackUrl:"http://localhost:8080/api/sessions/github-callback"
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`

        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                // console.log("profile",profile);
                const user = await usersModel.findOne({email:profile.username});
                if(user){
                    //el usuario ya esta registrado
                    return done(null,user);
                }
                //El usuario no esta registrado
                const newUser = {
                    first_name:profile._json.name,
                    email:profile.username,
                    password:createHash(profile.id)
                };
                console.log(newUser);
                const userCreated = await usersModel.create(newUser);
                return done(null,userCreated);
            } catch (error) {
                logger.error(error)
                return done(error)
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await usersDao.getUserById(id);
        done(null,user);//req.user = informacion del usuario que traemos de la base de datos
    });
};
// callbackURL:`http://localhost:8080/api/sessions/github-callback` //por algun motivo la ruta no me anda desde config pero si si la pongo especificamente. 