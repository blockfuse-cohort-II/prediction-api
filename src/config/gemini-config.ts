import { GoogleGenerativeAI } from "@google/generative-ai";
import secret from "./secret-config";

const genAi = new GoogleGenerativeAI(secret.GEMINI_API);

async function runGemini(prevQuestions: string[]) {
  const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate a single non-deterministic question for a guessing game. The question should have two possible answers but should not be based on logic or real-world facts. It should be unpredictable, example:

  'Between two cars, one red and one blue, which will cross the finish line first?'
  'Do I have a pencil or a pen in my mind?'
  'Boy or Girl?'
  Make sure none of this array of questions has been asked: ${prevQuestions}
  Only new question should be asked, I want each question to be unique and random 
  Return the question in a JSON format with the following structure:
{
  "question": "Your generated question",
  "option1": "First possible answer",
  "option2": "Second possible answer"
}
Ensure the question is always non-deterministic, meaning there is no way to logically deduce the correct answer. The answers should always be two distinct options. Do not add explanations, only return the JSON
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const newQuestion = await response.text();

  const cleanedString = newQuestion
  .replace(/^```json\s*\n/g, '')  // Remove opening code block
  .replace(/\n```\s*$/g, '')      // Remove closing code block
  .replace(/\n/g, '')             // Remove all newlines (optional)
  .trim(); 
    
  const jsonObject = JSON.parse(cleanedString)
  return jsonObject;
}

export default runGemini;
