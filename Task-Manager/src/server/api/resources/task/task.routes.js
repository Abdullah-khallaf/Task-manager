import { Router } from "express";
import {create} from './task.controller.js'
const router = new Router();

router.route('/').get().post(create);

export default router;
