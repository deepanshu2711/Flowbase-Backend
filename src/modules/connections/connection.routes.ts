import { Router } from "express";
import * as ConnectionController from "./connection.controller";

export const connectionRouter = Router();

connectionRouter.get("/", ConnectionController.getConnections);
connectionRouter.post("/add", ConnectionController.addConnection);
connectionRouter.delete("/:id", ConnectionController.deleteConnection);
