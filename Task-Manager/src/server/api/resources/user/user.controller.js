import connect from "../../database/index.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import * as userService from "./user.service.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    status: "success",
    data: {
      length: users.length,
      users,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.userId);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateUserRole = catchAsync(async (req, res, next) => {
  const affectedRows = await userService.updateUserRole(
    req.params.userId,
    req.body
  );

  res.status(200).json({
    status: "success",
    message: `${affectedRows} user is updated`,
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

export const resetPassword = catchAsync(async (req, res, next) => {
  await userService.resetPassword(req.params.token, req.body);

  res.status(200).json({
    status: "success",
    message: "password updated successfully",
  });
});
