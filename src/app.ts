import express from "express";
import cors from "cors";

import { authRouter } from "./modules/auth/auth.routes";
import { workflowRouter } from "./modules/workflows/workflow.routes";
import { nodeRouter } from "./modules/nodes/node.routes";
import { connectionRouter } from "./modules/connections/connection.routes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { executeRouter } from "./modules/executions/execution.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/workflows", authMiddleware, workflowRouter);
app.use("/api/nodes", authMiddleware, nodeRouter);
app.use("/api/connections", connectionRouter);
app.use("/api/executions", executeRouter);

export default app;
