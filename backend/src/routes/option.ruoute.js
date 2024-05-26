import { Router } from "express";
import { validation } from "../middlewares/validation.middleware.js";
import { optionSchema } from "../schema/index.js";
import {
  getOptions,
  searchOptionsByDate,
} from "../controllers/option.controller.js";
import { ValidationSource } from "../helpers/validation.js";

const optionRoute = new Router();

optionRoute.get("/", getOptions);
optionRoute.get(
  "/:date",
  validation(optionSchema.date, ValidationSource.PARAM),
  searchOptionsByDate
);

export default optionRoute;
