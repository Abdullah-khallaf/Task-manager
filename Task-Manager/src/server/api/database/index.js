import mysql from "mysql2";
import config from "../../config/config.js";

let pool;
export default () => {
  if (pool != undefined) {
    return pool;
  }

  let db_name;
  if (config.NODE_ENV == "dev") {
    db_name = config.DB_NAME;
  } else if (config.NODE_ENV == "test") {
    db_name = config.TEST_DB_NAME;
  }

  const poolConfig = {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: db_name,
  };
  pool = mysql.createPool(poolConfig).promise();

  pool.on("connection", () => {
    console.log(`connected to db: ${db_name}`);
  });
  pool.on("release", () => {
    console.log("mysql connection is released");
  });

  return pool;
};
