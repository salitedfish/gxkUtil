/**按需导出全部工具 */
export * from "./common";
export * from "./storage";
export * from "./websocket";
export * from "./fetch";
export * from "./axios";
export * from "./environment";
export * from "./dom";

/**统一导出全部工具 */
import * as useCommon from "./common";
import * as useEnvironment from "./environment";
import * as useStorage from "./storage";
import * as useWebsocket from "./websocket";
import * as useFetch from "./fetch";
import * as useAxios from "./axios";
import * as useDom from "./dom";

export default {
  ...useCommon,
  ...useEnvironment,
  ...useStorage,
  ...useWebsocket,
  ...useFetch,
  ...useAxios,
  ...useDom,
};
