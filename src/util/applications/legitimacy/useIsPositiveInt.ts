/**
 * 判断是否是正整数
 * @param num
 * @returns
 */
export const useIsPositiveInt = (num: number) => {
  /**排除0和NaN和其他类型 */
  if (!num || typeof num !== "number") {
    return false;
  }
  /**向下取整加取绝对值 */
  if (Math.abs(Math.floor(num)) === num) {
    return true;
  } else {
    return false;
  }
};
