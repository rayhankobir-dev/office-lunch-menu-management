import ApiError from "../helpers/ApiError.js";
import ApiResponse from "../helpers/ApiResponse.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { client } from "../helpers/db.js";

export const getAllMenus = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM menus";
    const result = await client.query(query);
    res
      .status(200)
      .json(new ApiResponse(200, "Success", { menus: result.rows }));
  } catch (error) {
    throw error;
  }
});

export const getMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query("SELECT * FROM menus WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) throw new ApiError(400, "Menu not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Success", { menu: result.rows[0] }));
  } catch (error) {
    throw error;
  }
});

export const addMenu = asyncHandler(async (req, res) => {
  const { name, unit } = req.body;
  try {
    const query = "INSERT INTO menus (name, unit) VALUES ($1, $2) RETURNING *";
    const result = await client.query(query, [name, unit]);
    res
      .status(201)
      .json(new ApiResponse(200, "Success", { menu: result.rows[0] }));
  } catch (error) {
    throw error;
  }
});

export const updateMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, unit } = req.body;
  try {
    const query =
      "UPDATE menus SET name = $1, unit = $2 WHERE id = $3 RETURNING *";
    const result = await client.query(query, [name, unit, id]);

    if (result.rows.length === 0) throw new ApiError(400, "Menu not found");

    res
      .status(200)
      .json(
        new ApiResponse(200, "Menu has been updated", { menu: result.rows[0] })
      );
  } catch (error) {
    throw error;
  }
});

export const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM menus WHERE id = $1 RETURNING *";
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) throw new ApiError(400, "Menu not found");

    res
      .status(200)
      .json(
        new ApiResponse(200, "Menu has been deleted", { menu: result.rows[0] })
      );
  } catch (error) {
    throw error;
  }
});
