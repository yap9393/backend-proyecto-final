import { Router } from "express";
import { usersController } from "../controllers/user.controller.js";

const router=Router();

router.post('/login', usersController.login)

router.get('/profile', usersController.profile)

router.get('/logout', usersController.logout)

export { router as usersRouter }