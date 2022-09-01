/**
 * 检查参数中是否有undefined
 * @param argument
 * @returns
 */
export const useCheckUndefined = (...argument: any[]): boolean => {
  return argument.includes(undefined);
};
