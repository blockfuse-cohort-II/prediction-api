import { Request, Response, Router } from "express";
import { createQuestion } from "./question-controller";

const questionRoute = Router();

questionRoute.post("/create-question", async (req: Request, res: Response) => {
  createQuestion(req, res);
});


export default questionRoute;
