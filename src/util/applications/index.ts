export * from "./common";
export * from "./timeHandler";
export * from "./legitimacy";
export * from "./environment";

import * as useCommon from "./common";
import * as useTimeHandler from "./timeHandler";
import * as useLegitimacy from "./legitimacy";
import * as useEnvironment from "./environment";

export default {
  ...useCommon,
  ...useTimeHandler,
  ...useLegitimacy,
  ...useEnvironment,
};
