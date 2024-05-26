import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  adapter: ["http", "xhr"],
  timeout: 5000,
});
