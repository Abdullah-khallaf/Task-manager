import connect from "../../database/index.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import * as userService from "./user.service.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { email, user_name, first_name, last_name, password } = req.body;

  if (!email || !user_name || !first_name || !last_name || !password) {
    return next(new AppError("please provide your information", 400));
  }

  const db = await connect();
  const sql = `
    insert into users(email, user_name, first_name, last_name, password)
    values (?, ?, ?, ?, ?)
  `;
  const [{ insertId }] = await db.query(sql, [
    email,
    user_name,
    first_name,
    last_name,
    password,
  ]);

  res.status(201).json({
    status: "success",
    data: {
      user: { id: insertId, email, user_name, first_name, last_name },
    },
  });
});

export const deleteAll = catchAsync(async (req, res, next) => {
  const db = await connect();
  const sql = `delete from users`;
  await db.query(sql)
  res.status(200).json({
    status: 'success',
    message: "users table is clear"
  })
})