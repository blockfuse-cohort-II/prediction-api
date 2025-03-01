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
exports.getQuestion = exports.createQuestion = void 0;
const question_modal_1 = __importDefault(require("./question-modal"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, deadline } = req.body;
    try {
        const newQuestion = yield question_modal_1.default.create({ question, deadline });
        yield newQuestion.save();
        return res.status(201).json({ message: "Question created successfully", newQuestion });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createQuestion = createQuestion;
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    try {
        const question = yield question_modal_1.default.findOne({ questionId });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({ question });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getQuestion = getQuestion;
