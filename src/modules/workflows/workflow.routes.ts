import { Router } from "express";
import * as WorkflowController from "./workflow.controller";

export const workflowRouter = Router();

workflowRouter.get("/", WorkflowController.getAllWorkflows);
workflowRouter.post("/create", WorkflowController.createWorkflow);
workflowRouter.post("/edit", WorkflowController.updateWorkflow);
workflowRouter.delete("/:id", WorkflowController.deleteWorkflow);
