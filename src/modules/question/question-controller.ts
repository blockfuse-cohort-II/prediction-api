import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import getRandomArray from "../../utils/getRandomArray";
import Question from "./question-modal";

export const createQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const randomArray = getRandomArray();
    const questionsFilePath = path.join(
      __dirname,
      "/../../data/questions.json"
    );
    const questionsData = JSON.parse(
      fs.readFileSync(questionsFilePath, "utf-8")
    );
    const questions = [];
    for (const question of randomArray) {
      questions.push(questionsData[question]);
    }
    return res
      .status(201)
      .json({ message: "Question created successfully", questions });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

