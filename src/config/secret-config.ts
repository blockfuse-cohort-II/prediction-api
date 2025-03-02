import { configDotenv } from "dotenv";

configDotenv();

const getStringConfigValue = (key: string) => {
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

export default secret;