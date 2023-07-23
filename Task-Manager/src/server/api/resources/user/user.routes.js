import { Router } from "express";
import { getAllUsers, deleteAll, signup } from "./user.controller.js";

const router = new Router();

router.route("/").get(getAllUsers);

router.route("/deleteAll").delete(deleteAll);
router.route("/signup").post(signup);

export default router;
