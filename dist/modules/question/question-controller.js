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
exports.createQuestion = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getRandomArray_1 = __importDefault(require("../../utils/getRandomArray"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomArray = (0, getRandomArray_1.default)();
        const questionsFilePath = path_1.default.join(__dirname, "/../../data/questions.json");
        const questionsData = JSON.parse(fs_1.default.readFileSync(questionsFilePath, "utf-8"));
        const questions = [];
        for (const question of randomArray) {
            questions.push(questionsData[question]);
        }
        return res
            .status(201)
            .json({ message: "Question created successfully", questions });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createQuestion = createQuestion;
