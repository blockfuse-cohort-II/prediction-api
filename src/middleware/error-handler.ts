import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import secret from "../config/secret-config";
import { AxiosError } from "axios";

const { CastError, ValidationError } = MongooseError;

const errorHandler = (
  error: Error | MongooseError | AxiosError | any, // Narrowing the type for better type safety
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  // Mongoose Cast Errors (e.g., invalid ObjectId format)
  if (error instanceof CastError) {
    const path = error.path === "_id" ? "id" : error.path;
    const message = `${path} expected ${error.kind}`;
    return res.status(400).json({ message });
  }

  // Mongoose Validation Errors (e.g., required fields)
  if (error instanceof ValidationError) {
    const message = Object.values(error.errors)
      .map((err: any) => err.message)
      .join(", ");
    return res.status(400).json({ message });
  }

  // Axios Errors
  if (error.isAxiosError) {
    // `isAxiosError` is a safer check for Axios errors
    const message = `Axios Error: ${error.message}\n${error.stack}`;
    return res.status(400).json({ message });
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (error.code === 11000) {
    const message = `${Object.keys(error.keyValue)} already exists`;
    return res.status(400).json({ message });
  }

  /*
    For server errors,
    return the error in development.
    This allows for the error to be viewed
    and prevent having to come back to the console to view the error
  */
  if (secret.NODE_ENV === "development") {
    return res.status(500).json({ error, message: error.message });
  }

  // Generic server error for production
  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;