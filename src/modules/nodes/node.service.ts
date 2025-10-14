import prisma from "../../config/db";
import { AppError, handlePrismaError } from "../../utils/appError";

export const getNodes = async (workflowId: string) => {
  return await prisma.node.findMany({
    where: { workflowId },
    orderBy: { createdAt: "asc" },
  });
};

export const addNode = async (
  name: string,
  type: string,
  data: Record<string, any>,
  workflowId: string,
) => {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    throw new AppError("Workflow not found", 404);
  }

  return await prisma.node.create({ data: { name, type, data, workflowId } });
};

export const deleteNode = async (id: string) => {
  return await prisma.node.delete({ where: { id } }).catch(handlePrismaError);
};
