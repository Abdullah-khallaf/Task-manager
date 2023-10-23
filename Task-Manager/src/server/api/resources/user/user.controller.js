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

export const deleteAll = catchAsync(async (req, res, next) => {
  const db = await connect();
  const sql = `delete from users`;
  await db.query(sql);
  res.status(200).json({
    status: "success",
    message: "users table is clear",
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const user = await userService.signup(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const user = await userService.login(req.body);
  req.session.user = user;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const logout = catchAsync(async (req, res, next) => {
  req.session.destroy();

  res.status(200).json({
    status: "success",
    message: "you are logged out ",
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  await userService.forgotPassword(req, req.body);

  res.status(200).json({
    status: "success",
    message: "reset token is sent to your email",
  });
});
