import prisma from "../../config/db";
import { AppError, handlePrismaError } from "../../utils/appError";

export const getConnections = async (workflowId: string) => {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });
  if (!workflow) throw new AppError("Workflow not found", 404);

  return await prisma.nodeConnection.findMany({ where: { workflowId } });
};

export const addConnection = async (
  workflowId: string,
  fromNodeId: string,
  toNodeId: string,
) => {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });
  if (!workflow) throw new AppError("Workflow not found", 404);

  const fromNode = await prisma.node.findUnique({ where: { id: fromNodeId } });
  const toNode = await prisma.node.findUnique({ where: { id: toNodeId } });

  if (!fromNode || !toNode) throw new AppError("Invalid node(s)", 400);
  if (fromNode.workflowId !== workflowId || toNode.workflowId !== workflowId) {
    throw new AppError("Nodes must belong to the same workflow", 400);
  }

  return await prisma.nodeConnection.create({
    data: { workflowId, fromNodeId, toNodeId },
  });
};

export const deleteConnection = async (id: string) => {
  return await prisma.nodeConnection
    .delete({ where: { id } })
    .catch(handlePrismaError);
};
