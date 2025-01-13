/**
 * 字符串由驼峰转下划线形式
 * @param str 驼峰字符串
 * @returns
 */
export const useCamelToSnake = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};
