import { Router } from "express";
import userRoutes from "./resources/user/user.routes.js";
import taskRoutes from "./resources/task/task.routes.js";

const restRouter = new Router();

restRouter.use("/v1/user", userRoutes);
restRouter.use("/v1/task", taskRoutes);

export default restRouter;
