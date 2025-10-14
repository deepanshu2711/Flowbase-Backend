import { GoogleGenAI } from "@google/genai";
import { AppError } from "../../../utils/appError";

const geminiAi = new GoogleGenAI({
  apiKey: "AIzaSyCEtoaWKVohsEEAloOEfWVA02pDJjT4uLo",
});

export const geminiAiNode = async (data: any) => {
  const prompt = data.prevResult?.text;

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
