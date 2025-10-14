export const logNode = async (data: any) => {
  const message = data.message || "No message provided";
  console.log("LOG NODE:", message);

  return { success: true, message };
};
