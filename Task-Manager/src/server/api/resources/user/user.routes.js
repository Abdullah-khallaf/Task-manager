import { Router } from "express";
import {
  getAllUsers,
  deleteAll,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "./user.controller.js";
import { isLoggedIn, restrictTo } from "./user.middleware.js";

const router = new Router();

router.route("/").get(getAllUsers);
router.route("/deleteAll").delete(deleteAll); //for dev

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

export default router;
