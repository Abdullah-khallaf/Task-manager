import { Router } from "express";
import { sayHi } from "./user.controller.js";

const router = new Router();

router.route("/sayHi").get(sayHi);

export default router;
