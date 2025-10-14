import { AppError } from "../../../utils/appError";

export const userInputNode = async (data: any) => {
  if (!data.message)
    throw new AppError("No input provided for User Input node", 400);
  return { text: data.message };
};
