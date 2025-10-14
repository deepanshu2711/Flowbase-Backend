import { aiExecutors } from "./ai";
import { coreExecutors } from "./core";
import { discordExecutors } from "./discord";
import { httpExecutors } from "./http";

export const executors: Record<string, (data: any) => Promise<any>> = {
  ...httpExecutors,
  ...coreExecutors,
  ...aiExecutors,
  ...discordExecutors,
};
