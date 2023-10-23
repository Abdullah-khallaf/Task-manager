import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_SECRET,
  TEST_DB_NAME,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
} = process.env;

export default {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_SECRET,
  TEST_DB_NAME,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
};
