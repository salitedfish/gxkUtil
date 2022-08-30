import packageJSON from "../../package.json";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 控制台警告信息
 * @param warnMessage
 */
export const useConsoleWarn = (warnMessage: string) => {
  console.warn(`${packageJSON.name}: ${warnMessage}`);
};

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 控制台错误信息
 * @param errMessage
 */
export const useConsoleError = (errMessage: string) => {
  console.error(`${packageJSON.name}: ${errMessage}`);
};
