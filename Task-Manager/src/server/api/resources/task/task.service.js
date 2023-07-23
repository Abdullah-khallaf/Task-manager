import AppError from "../../../utils/appError.js";
import connect from "../../database/index.js";

export const create = async (name) => {
  if (!name) {
    throw new AppError('please provide the name of the task', 400);
  }

  const db = await connect();
  const sql = `
    insert into tasks(name)
    values(?)
  `;
  const [{insertedId}] = await db.query(sql, [name]);

  return insertedId;
};
