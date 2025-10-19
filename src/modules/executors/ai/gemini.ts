import { GoogleGenAI } from "@google/genai";

import { AppError } from "../../../utils/appError";
import prisma from "../../../config/db";

export const geminiAiNode = async (data: any) => {
  const prompt = data.prevResult?.text;
  const { credentialId } = data;

  if (!credentialId) throw new AppError("credentialId is Missing", 400);

  const credentials = await prisma.credentials.findUnique({
    where: { id: credentialId },
  });

  if (!credentials) {
    throw new AppError("Credentials not found", 404);
  }

  const credentialData = credentials.data as { apiKey?: string } | null;

  const apiKey = credentialData?.apiKey;
  if (!apiKey) {
    throw new AppError("Missing API key in credentials", 400);
  }

  const geminiAi = new GoogleGenAI({ apiKey });

  if (!prompt) {
    throw new AppError("No input provided for Gemini AI Node", 400);
  }

  const result = await geminiAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const output = result.text;

  return { output };
};
