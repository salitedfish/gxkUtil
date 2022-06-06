/**按需导出全部工具 */
export * from "./common";
export * from "./storage";
export * from "./websocket";
export * from "./fetch";
export * from "./axios";
export * from "./environment";

/**统一导出全部工具 */
import * as useCommon from "./common";
import * as useEnvironment from "./environment";
import * as useStorage from "./storage";
import * as useWebsocket from "./websocket";
import * as useFetch from "./fetch";
import * as useAxios from "./axios";

export default {
  ...useCommon,
  ...useEnvironment,
  ...useStorage,
  ...useWebsocket,
  ...useFetch,
  ...useAxios,
};
