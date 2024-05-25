import pkg from "pg";
const { Client } = pkg;
import { dbConfig } from "../config.js";

const client = new Client(dbConfig);

// migrating database tables
export async function createTables() {
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              full_name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'employee')),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);

    await client.query(`
          CREATE TABLE IF NOT EXISTS menus (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            unit VARCHAR(50) NOT NULL
          );
        `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        menu_id INT NOT NULL,
        date DATE NOT NULL,
        max_limit INT NOT NULL,
        FOREIGN KEY (menu_id) REFERENCES menus(id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS choices (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        option_id INT NOT NULL,
        current_count INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (option_id) REFERENCES options(id)
      );
    `);

    console.log("SUCESS: Sucessfully database tables are created");
    console.log("HINT: For seeding use 'npm run seed' command");
  } catch (error) {
    console.log("Error: Failed to creating database tables!", error);
  }
}

(async () => {
  try {
    await client.connect();
    await createTables();
  } catch (error) {
    console.log("Error: Failed to creating database tables!", error);
  } finally {
    await client.end();
    process.exit(0);
  }
})();
