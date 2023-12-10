import { Router } from "express";
import { usersController } from "../controllers/user.controller.js";
// import { generateUser } from "../helpers/mock.js";

const router=Router();

router.post('/login', usersController.login)

router.get('/profile', usersController.profile)

router.get('/logout', usersController.logout)

// router.get("/mockingproducts",(req,res)=>{
//     const cant = parseInt(req.query.cant) || 10;
//     let users = [];
//     for(let i=0;i<cant;i++){
//         const newUser = generateUser();
//         users.push(newUser);
//     };
//     res.json({status:"success", data:users});
// });

export { router as usersRouter }