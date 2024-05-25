import ApiError from "../helpers/ApiError.js";
import ApiResponse from "../helpers/ApiResponse.js";
import asyncHandler from "../helpers/asyncHandler.js";

// register new user
export const signUpUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, "Done"));
});
