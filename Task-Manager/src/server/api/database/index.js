import mysql from "mysql2";
import config from "../../config/config.js";

let pool;
export default () => {
  if (pool != undefined) {
    return pool;
  }

  pool = mysql
    .createPool({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    })
    .promise();

  pool.on("connection", () => {
    console.log("connected to mysql");
  });
  pool.on("release", () => {
    console.log("mysql connection is released");
  });

  return pool;
};
