import { Router } from "express";
import {
  create,
  getAll,
  deleteAll,
  update,
  deleteTask,
  check,
  getTodayTasks,
} from "./task.controller.js";
import { isLoggedIn, restrictTo } from "../user/user.middleware.js";

const router = new Router();

router.use(isLoggedIn);
router.route("/deleteAll").delete(deleteAll);
router.route("/").post(create).get(getAll).patch(update).delete(deleteTask);
router.route("/check").post(check);
router.route("/todayTasks").get(getTodayTasks);
export default router;
