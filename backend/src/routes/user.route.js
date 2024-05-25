import { Router } from "express";
import { validation } from "../middlewares/validation.middleware.js";
import { ValidationSource } from "../helpers/validation.js";
import { userSchema } from "../schema/index.js";
import { signUpUser } from "../controllers/user.controller.js";

const userRoute = new Router();

userRoute.post("/signup", validation(userSchema.signup), signUpUser);

export default userRoute;
