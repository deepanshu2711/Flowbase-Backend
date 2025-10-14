import { Request, Response } from "express";

import * as AuthService from "./auth.service";
import { asyncHandler } from "../../utils/helpers";
import { successResponse } from "../../utils/responses";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await AuthService.registerUser(email, password, name);
  return successResponse(res, user);
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AuthService.signInUser(email, password);
  return successResponse(res, user);
});
