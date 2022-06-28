/**按需导出全部工具 */
export * from "./dataOperate";
export * from "./storage";
export * from "./websocket";
export * from "./genFetch";
export * from "./axios";
export * from "./environment";
export * from "./dom";
export * from "./applications";
export * from "./npm";

/**统一导出全部工具 */
import * as useDataOperate from "./dataOperate";
import * as useEnvironment from "./environment";
import * as useStorage from "./storage";
import * as useWebsocket from "./websocket";
import * as useFetch from "./genFetch";
import * as useAxios from "./axios";
import * as useDom from "./dom";
import * as useApplication from "./applications";
import * as useLib from "./npm";

export default {
  ...useDataOperate,
  ...useEnvironment,
  ...useStorage,
  ...useWebsocket,
  ...useFetch,
  ...useAxios,
  ...useDom,
  ...useApplication,
  ...useLib,
};
