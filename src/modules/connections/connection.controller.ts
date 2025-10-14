import { asyncHandler } from "../../utils/helpers";
import * as ConnectionController from "./connection.service";
import { successResponse } from "../../utils/responses";

export const getConnections = asyncHandler(async (req, res) => {
  const { workflowId } = req.query;
  const data = await ConnectionController.getConnections(workflowId);
  return successResponse(res, data);
});

export const addConnection = asyncHandler(async (req, res) => {
  const { workflowId, fromNodeId, toNodeId } = req.body;
  const data = await ConnectionController.addConnection(
    workflowId,
    fromNodeId,
    toNodeId,
  );
  return successResponse(res, data);
});

export const deleteConnection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await ConnectionController.deleteConnection(id);
  return successResponse(res, data);
});
