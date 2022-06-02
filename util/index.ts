export * from "./common";
export * from "./storage";
export * from "./websocket";
export * from "./service";

import { useDebounce, usePromiseQueue, useThrottling, useFileNameFromURL, useDeepCopy, useDownloadByURL, useIsMobile, useTimesClick } from "./common";
import { useGetLStorage, useSetLStorage, useRmLStorage } from "./storage";
import { useWebSocket } from "./websocket";
import { useAxios } from "./service";

export default {
  useDebounce,
  usePromiseQueue,
  useThrottling,
  useSetLStorage,
  useGetLStorage,
  useRmLStorage,
  useFileNameFromURL,
  useDeepCopy,
  useDownloadByURL,
  useIsMobile,
  useTimesClick,
  useWebSocket,
  useAxios,
};
