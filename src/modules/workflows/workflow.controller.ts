import { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers";
import { successResponse } from "../../utils/responses";
import * as WorkflowService from "./workflow.service";

export const getAllWorkflows = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await WorkflowService.getAllWorkflows(req.user!.id);
    return successResponse(res, data);
  },
);

export const createWorkflow = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const data = await WorkflowService.createWorkflow(
      req.user!.id,
      name,
      description,
    );
    return successResponse(res, data);
  },
);

export const updateWorkflow = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, id } = req.body;
    const data = await WorkflowService.updateWorkflow(
      id,
      req.user!.id,
      name,
      description,
    );
    return successResponse(res, data);
  },
);

export const deleteWorkflow = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await WorkflowService.deleteWorkflow(id, req.user!.id);
    return successResponse(res, data);
  },
);
