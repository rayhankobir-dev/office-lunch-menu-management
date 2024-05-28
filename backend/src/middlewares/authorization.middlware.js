import ApiError from "../helpers/ApiError.js";
import asyncHandler from "../helpers/asyncHandler.js";

// check authorization and give role based access to perform the taks
const authorization = (allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ApiError(401, "Authentication required");

    // check user role in allowed roles
    if (!allowedRoles.some((allowedRole) => allowedRole == req.user?.role))
      throw new ApiError(403, "Access denied");

    next();
  });

export default authorization;
