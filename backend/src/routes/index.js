import { Router } from "express";
import userRoute from "./user.route.js";
import menuRoute from "./menu.route.js";
import optionRoute from "./option.ruoute.js";

// creating a router to hanle requests
const routes = new Router();

routes.use("/user", userRoute);
routes.use("/menus", menuRoute);
routes.use("/options", optionRoute);

// server health checking endpoint
routes.get("/health-check", (req, res) => {
  return res.status(200).json({ message: "Server health is good!" });
});

export default routes;
