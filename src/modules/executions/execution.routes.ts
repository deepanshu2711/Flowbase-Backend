import { Router } from "express";
import * as ExecutionController from "./execution.controller";

export const executeRouter = Router();

executeRouter.get("/:id", ExecutionController.executeWorkflow);
