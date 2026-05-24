import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import config from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {

    const token =
      req.headers.authorization;

    if (!token) {

      throw new Error(
        "You are not authorized!",
      );

    }

    const decoded = jwt.verify(
      token,
      config.secret as string,
    );

    req.user = decoded;

    next();

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message,
      error,
    });

  }
};