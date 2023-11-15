import { Router } from "express";
import {
  getAllUsers,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  deleteUser,
} from "./user.controller.js";
import { isLoggedIn, restrictTo } from "./user.middleware.js";

const router = new Router();

router.route("/").get(isLoggedIn, restrictTo("admin"), getAllUsers);
router.route("/:userId").delete(isLoggedIn, restrictTo("admin"), deleteUser);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.use(isLoggedIn);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

export default router;
