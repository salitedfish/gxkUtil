export * from "./common";
// autoImport在结合useWebPrinter使用时，项目会报错，不知道原因
export * from "./autoImport";

import * as rollupPluginCommon from "./common";
export default {
  ...rollupPluginCommon,
};
