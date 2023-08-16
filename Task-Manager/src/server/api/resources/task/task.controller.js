import catchAsync from "../../../utils/catchAsync.js";
import * as taskService from "./task.service.js";

export const create = catchAsync(async (req, res, next) => {
  const task = await taskService.create(req.body, req.session.user.id);

  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const tasks = await taskService.getAll(req.session.user.id);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const deleteAll = catchAsync(async (req, res, next) => {
  const NumOfDeletedTasks = await taskService.deleteAll(req.session.user.id);

  res.status(200).json({
    status: "success",
    message: `${NumOfDeletedTasks} tasks is deleted`,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const affectedRows = await taskService.update(req.body, req.session.user.id);

  res.status(200).json({
    status: "success",
    message: `${affectedRows} task is updated`,
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const affectedRows = await taskService.deleteTask(
    req.body,
    req.session.user.id
  );

  res.status(204).json({
    status: "success",
    data: null,
    //  message: `${affectedRows} task is deleted`,
  });
});

export const check = catchAsync(async (req, res, next) => {
  const message = await taskService.check(req.body, req.session.user.id);

  res.status(200).json({
    status: "success",
    message,
  });
});
