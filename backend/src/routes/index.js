import { Router } from "express";

// creating a router to hanle requests
const routes = new Router();

// server health checking endpoint
routes.get("/health-check", (req, res) => {
  return res.status(200).json({ message: "Server health is good!" });
});

export default routes;
