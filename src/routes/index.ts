import { Router } from "express";
import questionRoute from "../modules/question/question-route";

const router = Router();

router.use(questionRoute);

export default router;