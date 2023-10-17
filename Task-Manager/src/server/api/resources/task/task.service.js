import AppError from "../../../utils/appError.js";
import connect from "../../database/index.js";
import moment from "moment";

export const create = async ({ name, description, category }, userId) => {
  if (!name) {
    throw new AppError("please provide the name of the task", 400);
  }

  const db = await connect();
  const sql = `
    insert into tasks(name, description, category, user_id)
    values(?, ?, ?, ?)
  `;
  const [{ insertId }] = await db.query(sql, [
    name,
    description,
    category,
    userId,
  ]);

  return {
    id: insertId,
    name,
    description,
    category,
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

/*
  todo: 
    -update description and category fields
    -make update service to return an updated row
*/
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

export const check = async ({ id }, userId) => {
  const db = await connect();
  let sql = `
    select num_of_repetitions
    from tasks
    where id = ? and user_id = ?
  `;
  let [[{ num_of_repetitions: numOfRepetions }]] = await db.query(sql, [
    id,
    userId,
  ]);

  let nextRepetition = null;
  let status = "notStarted";
  if (numOfRepetions == 0) {
    nextRepetition = moment().startOf("day").add(1, "day").unix(); //unix -> sec since the epoch
    status = "inProgress";
    numOfRepetions += 1;
  } else if (numOfRepetions == 1) {
    nextRepetition = moment().startOf("day").add(7, "day").unix();
    status = "inProgress";
    numOfRepetions += 1;
  } else if (numOfRepetions == 2) {
    nextRepetition = moment().startOf("day").add(16, "day").unix();
    status = "inProgress";
    numOfRepetions += 1;
  } else if (numOfRepetions == 3) {
    nextRepetition = moment().startOf("day").add(35, "day").unix();
    status = "inProgress";
    numOfRepetions += 1;
  } else {
    nextRepetition = null;
    status = "completed";
  }

  sql = `
    update tasks
    set next_repetition =  ?,
        num_of_repetitions = ?,
        status = ?
    where id = ? and user_id = ?
  `;
  await db.query(sql, [nextRepetition, numOfRepetions, status, id, userId]);

  return status == "inProgress"
    ? `your next repetition data is ${moment(nextRepetition * 1000)}`
    : "this task is already completed";
};
