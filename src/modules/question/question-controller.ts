import { Request, Response } from "express";
import Question from "./question-modal";
import runGemini from "../../config/gemini-config";

export const createQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { question, deadline } = req.body;
  try {
    //    const newQuestion = await Question.create({question, deadline});
    //    await newQuestion.save();
    const getPrevQuestions = (await Question.find()).map(
      (data) => data.question
    );
    // console.log({ getPrevQuestions });

    const getQuestion = await runGemini(getPrevQuestions);
    console.log({getQuestion})
        const newQuestion = await Question.create({question: getQuestion?.question, deadline});
       await newQuestion.save();
    return res
      .status(201)
      .json({ message: "Question created successfully", getQuestion });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { questionId } = req.params;
  try {
    const question = await Question.findOne({ questionId });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ question });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
