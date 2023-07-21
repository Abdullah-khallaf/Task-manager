import { Router } from "express";
import { getAllUsers } from "./user.controller.js";

const router = new Router();

router.route("/").get(getAllUsers);

export default router;
