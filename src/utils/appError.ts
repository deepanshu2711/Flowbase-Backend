import { Prisma } from "../generated/prisma";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handlePrismaError = (error: unknown): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new AppError("Workflow not found or you don't have access", 404);
    }
    if (error.code === "P2002") {
      throw new AppError("A workflow with this name already exists", 409);
    }
  }
  throw error;
};
