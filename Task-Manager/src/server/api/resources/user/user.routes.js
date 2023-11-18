import { Router } from "express";
import {
  getAllUsers,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateUserRole,
  createUser,
} from "./user.controller.js";
import { isLoggedIn, restrictTo } from "./user.middleware.js";

const router = new Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

router.use(isLoggedIn); //protect all routes below this line

//updateMe, deleteMe
router.route("/logout").get(logout);

router.use(restrictTo("admin")); // admin

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").delete(deleteUser).patch(updateUserRole);

export default router;
