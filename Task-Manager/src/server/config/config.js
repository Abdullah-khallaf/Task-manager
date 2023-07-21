import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

export default {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};
