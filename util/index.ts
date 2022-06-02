export * from "./common";
export { useWebSocket } from "./websocket";
export { useAxios } from "./service";

import { useDebounce, usePromiseQueue, useThrottling, useGetLStorage, useSetLStorage, useRmLStorage } from "./common";
import { useWebSocket } from "./websocket";
import { useAxios } from "./service";

export default {
  useDebounce,
  usePromiseQueue,
  useThrottling,
  useSetLStorage,
  useGetLStorage,
  useRmLStorage,
  useWebSocket,
  useAxios,
};
