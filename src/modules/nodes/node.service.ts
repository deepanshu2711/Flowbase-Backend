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
  userId: string,
) => {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    throw new AppError("Workflow not found", 404);
  }

  let credentialId: string | undefined = data.credentialId;

  if (data.credential) {
    const {
      type: credType,
      apiKey,
      name,
      botToken,
      channelId,
    } = data.credential;
    const credentials = await prisma.credentials.create({
      data: {
        userId,
        data: { apiKey: apiKey, botToken, channelId },
        name,
        type,
      },
    });
    credentialId = credentials.id;
  }

  const nodeData = { ...data };
  delete nodeData.credential;

  if (credentialId) nodeData.credentialId = credentialId;
  return await prisma.node.create({
    data: { name, type, data: nodeData, workflowId },
  });
};

export const deleteNode = async (id: string) => {
  return await prisma.node.delete({ where: { id } }).catch(handlePrismaError);
};
