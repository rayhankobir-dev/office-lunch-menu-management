import pkg from "pg";
const { Client } = pkg;
import { dbConfig } from "../config.js";

export const client = new Client(dbConfig);

export const connectDB = async () => {
  try {
    client.connect().then(() => {
      console.log("Connected to PostgreSQL database");
    });
  } catch (error) {
    console.error("FAILED: Database connection failed ", error);
    process.exit(1);
  }
};
