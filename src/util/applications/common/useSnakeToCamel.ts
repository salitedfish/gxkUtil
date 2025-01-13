/**
 * 字符串由下划线转驼峰形式
 * @param str 下划线字符串
 * @returns
 */
export const useSnakeToCamel = (str: string) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};
