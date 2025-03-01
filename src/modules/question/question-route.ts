import { Router, Request, Response, NextFunction } from "express";
import { createQuestion, getQuestion } from "./question-controller";

const questionRoute = Router();

questionRoute.post("/create-question", async (req: Request, res: Response) => {
  createQuestion(req, res);
});

questionRoute.get(
  "/get-question/:questionId",
  async (req: Request, res: Response) => {
    getQuestion(req, res);
  }
);

export default questionRoute;
