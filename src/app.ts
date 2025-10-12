import express from "express";
import cors from "cors";
import { workflowRouter } from "./modules/workflows/workflow.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workflows", workflowRouter);

export default app;
