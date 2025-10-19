import { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers";
import * as NodeService from "./node.service";
import { successResponse } from "../../utils/responses";

export const getNodes = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query;
  const data = await NodeService.getNodes(workflowId as string);
  return successResponse(res, data);
});

export const addNode = asyncHandler(async (req: Request, res: Response) => {
  const { name, type, data, workflowId } = req.body;
  const userId = req.user?.id;
  const node = await NodeService.addNode(
    name,
    type,
    data,
    workflowId,
    userId as string,
  );
  return successResponse(res, node);
});

export const deleteNode = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const node = await NodeService.deleteNode(id);
  return successResponse(res, node);
});
