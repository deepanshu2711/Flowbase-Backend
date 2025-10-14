import axios from "axios";

export const httpRequest = async (data: any) => {
  const { url, method = "GET", body, headers } = data;
  if (!url) throw new Error("Missing URL in HTTP Request node");

  const res = await axios({ url, method, data: body, headers });
  return { status: res.status, data: res.data };
};
