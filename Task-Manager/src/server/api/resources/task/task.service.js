import AppError from "../../../utils/appError.js";
import connect from "../../database/index.js";

export const create = async ({ name }, userId) => {
  if (!name) {
    throw new AppError("please provide the name of the task", 400);
  }

  const db = await connect();
  const sql = `
    insert into tasks(name, user_id)
    values(?, ?)
  `;
  const [{ insertId }] = await db.query(sql, [name, userId]);
  return {
    id: insertId,
    name,
  };
};

export const getAll = async (userId) => {
  const db = await connect();
  const sql = `
    select *
    from tasks
    where user_id = ?
  `;
  const [tasks] = await db.query(sql, [userId]);

  return tasks;
};

export const deleteAll = async (userId) => {
  const db = await connect();
  const sql = `
    delete 
    from tasks
    where user_id = ?
  `;
  const [{ affectedRows }] = await db.query(sql, [userId]);
  return affectedRows;
};

export const update = async ({ id, name }, userId) => {
  const db = await connect();
  const sql = `
    update tasks
    set
      name = ?
    where id = ? and user_id = ?
  `;

  const [{ affectedRows }] = await db.query(sql, [name, id, userId]);

  return affectedRows;
};

export const deleteTask = async ({ id }, userId) => {
  const db = await connect();
  const sql = `
    delete
    from tasks
    where id = ? and user_id = ?
  `;
  const [{ affectedRows }] = await db.query(sql, [id, userId]);

  return affectedRows;
};
