"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const getStringConfigValue = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} was not set in environment variable`);
    }
    return value;
};
const secret = {
    ORIGIN: getStringConfigValue("ORIGIN"),
    MONGODB_URI: getStringConfigValue("MONGODB_URI"),
    GEMINI_API: getStringConfigValue("GEMINI_API"),
    PRIVATE_KEY_SALT: getStringConfigValue("PRIVATE_KEY_SALT"),
    NODE_ENV: process.env.NODE_ENV || "development",
};
exports.default = secret;
