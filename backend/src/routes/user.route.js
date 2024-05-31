import { Router } from "express";
import { validation } from "../middlewares/validation.middleware.js";
import { ValidationSource } from "../helpers/validation.js";
import { userSchema } from "../schema/index.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getChoosenOption,
  getProfile,
  loginUser,
  signUpUser,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const userRoute = new Router();

userRoute.post("/signup", validation(userSchema.signup), signUpUser);
userRoute.post("/login", validation(userSchema.login), loginUser);
userRoute.get("/profile", auth, getProfile);
userRoute.get("/", auth, getAllUsers);
userRoute.post("/", auth, createUser);
userRoute.delete("/:id", auth, deleteUser);
userRoute.get("/:id/:date", auth, getChoosenOption);

export default userRoute;
