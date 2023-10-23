import { Router } from "express";
import {
  getAllUsers,
  deleteAll,
  signup,
  login,
  logout,
  forgotPassword,
} from "./user.controller.js";
import { isLoggedIn, restrictTo } from "./user.middleware.js";

const router = new Router();

router.route("/").get(getAllUsers);
router.route("/deleteAll").delete(deleteAll);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/resetPassword").post(forgotPassword);

export default router;
