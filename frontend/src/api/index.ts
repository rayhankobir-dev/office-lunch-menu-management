import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
