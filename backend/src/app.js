import cors from "cors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { corsConfig, environment } from "./config.js";
import routes from "./routes/index.js";
import ApiError from "./helpers/ApiError.js";

// defining express app
const app = express();
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// handle api routes
app.use("/api/v1", routes);

// not found route
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Not found!",
  });
});

// middleware error handler
app.use((error, req, res, next) => {
  if (environment == "dev") {
    console.error(error);
  }

  // check is api error or not
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...error,
    });
  }

  // if error is not api error then we will sent 500
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
});

// exporting express app
export default app;
