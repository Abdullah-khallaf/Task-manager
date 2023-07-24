import { Router } from "express";
import {
  create,
  getAll,
  deleteAll,
  update,
  deleteTask,
} from "./task.controller.js";
import { isLoggedIn, restrictTo } from "../user/user.middleware.js";

const router = new Router();

router.use(isLoggedIn);
router.route("/deleteAll").delete(deleteAll);
router.route("/").post(create).get(getAll).patch(update).delete(deleteTask);

export default router;
