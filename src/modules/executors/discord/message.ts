import axios from "axios";
import prisma from "../../../config/db";
import { AppError } from "../../../utils/appError";

export const sendDiscordMessage = async (data: any) => {
  const message = data.prevResult.output;
  const { credentialId } = data;

  if (!credentialId) throw new AppError("credentialId is missing", 400);
  if (!message) throw new AppError("No message found in prevResult", 400);

  const credentials = await prisma.credentials.findUnique({
    where: { id: credentialId },
  });

  if (!credentials) throw new AppError("Discord credentials not found", 404);

  const { botToken, channelId } = credentials.data as {
    botToken: string;
    channelId: string;
  };

  if (!botToken || !channelId)
    throw new AppError("Discord bot token or channelId missing", 400);

  try {
    const response = await axios.post(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      { content: message },
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      status: "success",
      messageId: response.data.id,
      sentAt: response.data.timestamp,
      content: response.data.content,
    };
  } catch (error: any) {
    console.error("Discord Message Send Error:", error.response?.data || error);
    throw new AppError("sFailed to send message to Discord", 500);
  }
};
