import catchAsync from "../../../utils/catchAsync.js";
import * as taskService from "./task.service.js";

export const create = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const id = await taskService.create(name);

  res.status(201).json({
    status: "success",
    data: {
      task: {
        id,
        name,
      },
    },
  });
});
