import { Request, Response } from "express";
import Question from "./question-modal";

export const createQuestion = async (req: Request, res: Response): Promise<Response> => {
    const { question, deadline} = req.body;
    try {
       const newQuestion = await Question.create({question, deadline});
       await newQuestion.save();
       return res.status(201).json({message: "Question created successfully", newQuestion}); 
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}

export const getQuestion = async (req: Request, res: Response): Promise<Response> => {
    const { questionId } = req.params;
    try {
        const question = await Question.findOne({questionId});
        if (!question) {
            return res.status(404).json({message: "Question not found"});
        }
        return res.status(200).json({question});
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}