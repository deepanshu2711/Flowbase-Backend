import { logNode } from "./log";
import { delayNode } from "./delay";
import { userInputNode } from "./input";

export const coreExecutors = {
  log: logNode,
  delay: delayNode,
  input: userInputNode,
};
