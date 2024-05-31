import ApiError from "../helpers/ApiError.js";
import ApiResponse from "../helpers/ApiResponse.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { client } from "../helpers/db.js";

export const getOptions = asyncHandler(async (req, res) => {
  try {
    const query = `
        SELECT 
            o.date,
            ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'option_id', o.id,
                    'menu_name', m.name,
                    'max_limit', o.max_limit
                )
            ) AS menus
        FROM 
            options o
        JOIN 
            menus m ON o.menu_id = m.id
        GROUP BY 
            o.date
        ORDER BY 
            o.date;
      `;
    const result = await client.query(query);
    res.status(200).json(
      new ApiResponse(200, "Success", {
        options: result.rows,
      })
    );
  } catch (error) {
    throw error;
  }
});

export const searchOptionsByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  try {
    const query = `
      SELECT 
        o.date,
      ARRAY_AGG(
          JSON_BUILD_OBJECT(
              'option_id', o.id,
              'menu_id', m.id,
              'menu_name', m.name,
              'menu_unit', m.unit,
              'max_limit', o.max_limit
          )
      ) AS menus
      FROM 
        options o
      JOIN 
          menus m ON o.menu_id = m.id
      WHERE 
          o.date = $1
      GROUP BY 
          o.date
      ORDER BY 
          o.date;
      `;

    const result = await client.query(query, [date]);
    res.status(200).json(new ApiResponse(200, "Success", ...result.rows));
  } catch (error) {
    throw error;
  }
});
