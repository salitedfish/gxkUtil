import packageJSON from "../../package.json";

/**
 * 控制台错误信息
 * @param errMessage
 */
export const useConsoleError = (errMessage: string) => {
  console.error(`${packageJSON.name}: ${errMessage}`);
};
