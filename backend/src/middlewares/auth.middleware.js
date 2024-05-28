import jwt from "jsonwebtoken";
import { tokenConfig } from "../config.js";
import ApiError from "../helpers/ApiError.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { client } from "../helpers/db.js";

// check user authentication and set cureent user into the request
const auth = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      res.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new ApiError(401, "Authentication required");

    const payload = jwt.decode(accessToken, tokenConfig.secret);
    if (!payload) throw new ApiError(401, "Invalid Access token");

    const query = "SELECT id, full_name, email, role FROM users WHERE id = $1";
    const result = await client.query(query, [payload.id]);

    if (!result.rowCount > 0) throw new ApiError(401, "Invalid Access Token");
    req.user = result.rows[0];

    next();
  } catch (error) {
    throw error;
  }
});

export default auth;
