import pkg from "pg";
import { dbConfig } from "../config.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const { Client } = pkg;
const client = new Client(dbConfig);

async function getUserIds() {
  const res = await client.query("SELECT id FROM users");
  return res.rows.map((row) => row.id);
}

async function getMenuIds() {
  const res = await client.query("SELECT id FROM menus");
  return res.rows.map((row) => row.id);
}

async function getOptionIds() {
  const res = await client.query("SELECT id FROM options");
  return res.rows.map((row) => row.id);
}

// seeding the users table
async function seedUsers() {
  const roles = ["admin", "employee"];
  const adminCount = 2; // Number of admin users
  const employeeCount = 8; // Number of employee users
  const totalUsers = adminCount + employeeCount;

  for (let i = 0; i < 10; i++) {
    const full_name = faker.internet.displayName();
    const email = faker.internet.email();
    const password = await bcrypt.hash("123456", 10);
    const role = i < adminCount ? "admin" : "employee"; // Assign role based on index

    await client.query(
      "INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4)",
      [full_name, email, password, role]
    );
  }
}

// seeding the menus tables
async function seedMenus() {
  const units = ["grams", "liters", "pieces"];

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName();
    const unit = units[Math.floor(Math.random() * units.length)];

    await client.query("INSERT INTO menus (name, unit) VALUES ($1, $2)", [
      name,
      unit,
    ]);
  }
}

// seeding options table
async function seedOptions() {
  const menuIds = await getMenuIds();
  for (let i = 1; i <= 10; i++) {
    const menu_id = menuIds[Math.floor(Math.random() * menuIds.length)];
    const date = faker.date.future().toISOString().split("T")[0];
    const max_limit = Math.floor(Math.random() * 5) + 1;

    await client.query(
      "INSERT INTO options (menu_id, date, max_limit) VALUES ($1, $2, $3)",
      [menu_id, date, max_limit]
    );
  }
}

// seeding the choices table
async function seedChoices() {
  const userIds = await getUserIds();
  const optionIds = await getOptionIds();

  for (let i = 1; i <= 15; i++) {
    const user_id = userIds[Math.floor(Math.random() * userIds.length)];
    const option_id = optionIds[Math.floor(Math.random() * optionIds.length)];
    const current_count = Math.floor(Math.random() * 5) + 1;

    await client.query(
      "INSERT INTO choices (user_id, option_id, current_count) VALUES ($1, $2, $3)",
      [user_id, option_id, current_count]
    );
  }
}

(async () => {
  try {
    await client.connect();
    await seedUsers();
    await seedMenus();
    await seedOptions();
    await seedChoices();
    console.log("SUCCESS: Seeding completed successfully.");
  } catch (err) {
    console.error("Error: Failed to seeding the database.\n", err);
    console.log(
      "HINT: Before seeding migrate your database. Run 'npm run migrate' command"
    );
  } finally {
    await client.end();
    process.exit(0);
  }
})();
