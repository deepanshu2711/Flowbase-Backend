import { Router } from "express";
import * as NodeController from "./node.controller";

export const nodeRouter = Router();

nodeRouter.get("/", NodeController.getNodes);
nodeRouter.post("/add", NodeController.addNode);
nodeRouter.delete("/:id", NodeController.deleteNode);
