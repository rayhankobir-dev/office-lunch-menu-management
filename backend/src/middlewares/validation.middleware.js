import ApiError from "../helpers/ApiError.js";
import { ValidationSource } from "../helpers/validation.js";
import { capitalizeString } from "../lib/utils.js";

// request validation
export const validation =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source], { abortEarly: false });
      if (!error) return next();

      if (source === ValidationSource.HEADER) {
        return res.status(505).json({
          success: false,
          message: "Permission denied",
        });
      }

      let errors = [];

      if (error.details.length <= 1) {
        return res.status(400).json({
          success: false,
          message: "Bad request",
          error: capitalizeString(
            error.details[0].message.replace(/['"]+/g, "")
          ),
        });
      } else {
        error.details.map((item) => {
          let fieldName = item.path[0];
          let message = capitalizeString(item.message.replace(/['"]+/g, ""));
          let errorObject = {};
          errorObject[fieldName] = message;
          errors.push(errorObject);
        });
        throw new ApiError(400, "Bad request", errors);
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        errors: error.errors,
      });
    }
  };
