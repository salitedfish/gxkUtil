import { useIsPositiveInt } from ".";

/**
 * 判断是否是质数
 * @param num
 * @returns
 */
export const useIsPrime = (num: number) => {
  /**判断大于等于2的正整数 */
  if (!useIsPositiveInt(num) || num === 1) return false;
  /**一个数如果存在约数，那必定有一个是小于等于它的平方根，所以只需要判断到它的平方根就结束 */
  const temp = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= temp; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
