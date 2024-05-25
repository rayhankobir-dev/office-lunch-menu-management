import { Router } from "express";
import userRoute from "./user.route.js";

// creating a router to hanle requests
const routes = new Router();

routes.use("/user", userRoute);

// server health checking endpoint
routes.get("/health-check", (req, res) => {
  return res.status(200).json({ message: "Server health is good!" });
});

export default routes;
