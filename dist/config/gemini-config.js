"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const secret_config_1 = __importDefault(require("./secret-config"));
const genAi = new generative_ai_1.GoogleGenerativeAI(secret_config_1.default.GEMINI_API);
function runGemini() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Generate a single non-deterministic question for a guessing game. The question should have two possible answers but should not be based on logic or real-world facts. It should be unpredictable, example:

  'Between two cars, one red and one blue, which will cross the finish line first?'
  'Do I have a pencil or a pen in my mind?'
  'Boy or Girl?'
  make it more of word problems that should require a bit of thinking,  
  Only new question should be asked, I want each question to be unique and random 
  Return the question in a JSON format with the following structure:
  [
    {
  "question": "Your generated question",
  "options": ["First possible answer", "second possible answer"],
  "answer": "Random number, 0 or 1"
},
....

  ]

The array should have a length of 200.

Ensure the question is always non-deterministic, meaning there is no way to logically deduce the correct answer. The answers should always be two distinct options. Do not add explanations, only return the JSON
  `;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const newQuestion = yield response.text();
        const cleanedString = newQuestion
            .replace(/^```json\s*\n/g, '') // Remove opening code block
            .replace(/\n```\s*$/g, '') // Remove closing code block
            .replace(/\n/g, '') // Remove all newlines (optional)
            .trim();
        const jsonObject = JSON.parse(cleanedString);
        return jsonObject;
    });
}
exports.default = runGemini;
