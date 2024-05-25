import ApiError from "./ApiError.js";

// handler errors for async controller
const asyncHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    if (err instanceof ApiError) {
      return ApiError.handle(err, res);
    }
    return next(err);
  }
};

export default asyncHandler;
