import { Request, Response } from "express";
import * as ExecutionService from "./execution.serivce";

import { asyncHandler } from "../../utils/helpers";
import { successResponse } from "../../utils/responses";

export const executeWorkflow = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ExecutionService.run(id);
    return successResponse(res, data);
  },
);
