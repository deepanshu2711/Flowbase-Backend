export const delayNode = async (data: any) => {
  const ms = data.ms || 1000;

  await new Promise((resolve) => setTimeout(resolve, ms));

  console.log(`DELAY NODE: waited ${ms}ms`);
  return { success: true, waited: ms };
};
