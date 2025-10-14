import prisma from "../../config/db";
import { Node } from "../../generated/prisma";
import { AppError } from "../../utils/appError";
import { executors } from "../executors";

export const run = async (id: string) => {
  const workflow = await prisma.workflow.findUnique({
    where: { id },
    include: { Node: true, NodeConnection: true },
  });
  if (!workflow) throw new AppError("workflow does not exists", 404);
  const { Node: nodes, NodeConnection: connections } = workflow;
  if (!nodes.length)
    throw new AppError("No nodes found for this workflow", 400);

  const execution = await prisma.execution.create({
    data: { workflowId: id, status: "running" },
  });

  const startNode = nodes.find(
    (n) => !connections.some((c) => c.toNodeId === n.id),
  );

  if (!startNode) throw new AppError("No start node found", 400);

  let currentNode: Node | null = startNode;
  const results: Record<string, any> = {};

  try {
    while (currentNode) {
      const executor = executors[currentNode.type];
      if (!executor)
        throw new AppError(`Unsupported node type: ${currentNode.type}`, 400);

      const prevNodeId = connections.find(
        (c) => c.toNodeId === currentNode!.id,
      )?.fromNodeId;

      const prevResult = prevNodeId ? results[prevNodeId] : null;

      const nodeData =
        typeof currentNode.data === "object" && currentNode.data !== null
          ? currentNode.data
          : {};

      const nodeInput = {
        ...nodeData,
        prevResult,
      };

      const result = await executor(nodeInput);
      results[currentNode.id] = result;

      await prisma.log.create({
        data: {
          message: `Node ${currentNode.name} executed successfully`,
          level: "info",
        },
      });

      const nextConnection = connections.find(
        (c) => c.fromNodeId === currentNode!.id,
      );

      currentNode = nextConnection
        ? (nodes.find((n) => n.id === nextConnection.toNodeId) ?? null)
        : null;
    }

    await prisma.execution.update({
      where: { id: execution.id },
      data: {
        status: "success",
        result: results,
        finishedAt: new Date(),
      },
    });

    return results;
  } catch (err: any) {
    await prisma.log.create({
      data: {
        message: `Execution failed: ${err.message}`,
        level: "error",
      },
    });

    await prisma.execution.update({
      where: { id: execution.id },
      data: { status: "failed", finishedAt: new Date() },
    });
  }
};
