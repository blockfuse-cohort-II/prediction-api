import { Router } from "express";
import questionRoute from "../modules/question/question-route";
import walletRoute from "../modules/wallet/wallet-route";

const router = Router();

router.use(questionRoute);
router.use(walletRoute)

export default router;