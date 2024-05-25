import dotenv from "dotenv";

// configuring dotenv to get environment variables
dotenv.config();

// server configuration
export const port = process.env.PORT || 3000;
export const host = process.env.HOST || "localhost";
export const environment = process.env.ENVIRONMENT || "dev";

// cors policy confiuration
export const corsConfig = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// db configuration
export const dbConfig = {
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
};

// session configuration
export const sessionConfig = {
  secret: process.env.SESSION_SECRET,
};
