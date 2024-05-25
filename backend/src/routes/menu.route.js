import { Router } from "express";
import { validation } from "../middlewares/validation.middleware.js";
import { menuSchema } from "../schema/index.js";
import {
  addMenu,
  deleteMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
} from "../controllers/menu.controller.js";
import { ValidationSource } from "../helpers/validation.js";

const menuRoute = new Router();

menuRoute.get("/", getAllMenus);
menuRoute.get(
  "/:id",
  validation(menuSchema.id, ValidationSource.PARAM),
  getMenuById
);
menuRoute.post("/", validation(menuSchema.add), addMenu);
menuRoute.put(
  "/:id",
  validation(menuSchema.edit),
  validation(menuSchema.id, ValidationSource.PARAM),
  updateMenu
);
menuRoute.delete(
  "/:id",
  validation(menuSchema.id, ValidationSource.PARAM),
  deleteMenu
);

export default menuRoute;
