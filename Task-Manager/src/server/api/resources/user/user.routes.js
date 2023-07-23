import { Router } from "express";
import { getAllUsers , create, deleteAll} from "./user.controller.js";

const router = new Router();

router.route("/").get(getAllUsers).post(create);

router.route("/deleteAll").delete(deleteAll)

export default router;
