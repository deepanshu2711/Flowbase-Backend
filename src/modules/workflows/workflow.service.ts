import prisma from "../../config/db";
import { handlePrismaError } from "../../utils/appError";

export const getAllWorkflows = async (userId: string) => {
  return await prisma.workflow.findMany({
    where: { userId },
  });
};

export const createWorkflow = async (
  userId: string,
  name: string,
  description?: string,
) => {
  return await prisma.workflow.create({
    data: { userId, name, description },
  });
};

export const updateWorkflow = async (
  id: string,
  userId: string,
  name: string,
  description?: string,
) => {
  return await prisma.workflow
    .update({
      where: { id_userId: { id, userId } },
      data: { name, description },
    })
    .catch(handlePrismaError);
};

export const deleteWorkflow = async (id: string, userId: string) => {
  return await prisma.workflow
    .delete({
      where: { id_userId: { id, userId } },
    })
    .catch(handlePrismaError);
};
