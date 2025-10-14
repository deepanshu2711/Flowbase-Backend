import { Router } from "express";
import * as AuthController from "./auth.controller";

export const authRouter = Router();

authRouter.post("/signin", AuthController.signIn);
authRouter.post("/signup", AuthController.signUp);
