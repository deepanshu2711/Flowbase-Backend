import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responses";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const decoded = jwt.verify(token, "jwt_secret") as {
      userId: string;
    };
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return errorResponse(res, "Unauthorized", 401);
  }
};
