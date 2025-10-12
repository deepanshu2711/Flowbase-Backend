import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responses";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/helpers";

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
) =>
  asyncHandler(async () => {
    {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      req.user = { id: decoded.id };
      next();
    }
  });
