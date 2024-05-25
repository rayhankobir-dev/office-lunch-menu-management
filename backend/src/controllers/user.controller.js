import ApiError from "../helpers/ApiError.js";
import ApiResponse from "../helpers/ApiResponse.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { client } from "../helpers/db.js";
import bcrypt from "bcrypt";

// register new user
export const signUpUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const isExist = await userExistsByEmail(email);
    if (isExist) throw new ApiError(409, "Email already in use");

    const query =
      "INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id";
    await client.query(query, [fullName, email, hashedPassword, role]);

    res.status(201).json(new ApiResponse(201, "Successfully registered"));
  } catch (error) {
    throw error;
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM Users WHERE email = $1";
    const result = await client.query(query, [email]);

    if (result.rows.length === 0)
      throw new ApiError(400, "Invalid email or password");

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new ApiError(400, "Invalid email or password");

    const userSessionData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // set user into session
    req.session.user = userSessionData;

    res.status(200).json(new ApiResponse(200, "Login successful"));
  } catch (error) {
    throw error;
  }
});

const userExistsByEmail = async (email) => {
  const result = await client.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  return result.rowCount > 0;
};

const userExistsById = async (id) => {
  const result = await client.query("SELECT id FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
};
