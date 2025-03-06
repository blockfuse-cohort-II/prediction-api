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
exports.getWallet = exports.createWallet = void 0;
const ethers_1 = require("ethers");
const secret_config_1 = __importDefault(require("../../config/secret-config"));
const encryption_1 = require("../../utils/encryption");
const wallet_modal_1 = __importDefault(require("./wallet-modal"));
const createWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.body;
    try {
        const lowerCaseUserName = userName.toLowerCase();
        const existingUsername = yield wallet_modal_1.default.findOne({ name: lowerCaseUserName });
        if (existingUsername) {
            return res.status(400).json({ message: "User already exist!" });
        }
        const { privateKey, address } = ethers_1.ethers.Wallet.createRandom();
        const encryptedKey = (0, encryption_1.encrypt)(privateKey, secret_config_1.default.PRIVATE_KEY_SALT);
        const newWallet = yield wallet_modal_1.default.create({
            name: lowerCaseUserName,
            publicKey: address,
            privateKey: encryptedKey,
        });
        yield newWallet.save();
        return res.status(201).json({ message: "Question created successfully", newWallet });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createWallet = createWallet;
const getWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params;
    try {
        const lowerCaseUserName = userName.toLowerCase();
        const wallet = yield wallet_modal_1.default.findOne({ name: lowerCaseUserName });
        if (!wallet) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ wallet });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getWallet = getWallet;
