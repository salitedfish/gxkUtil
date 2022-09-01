/**
 * 判断是不是正整数
 * @param num
 * @returns
 */
export const useIsPositiveInt = (num: number) => {
  /**排除0和NaN */
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
