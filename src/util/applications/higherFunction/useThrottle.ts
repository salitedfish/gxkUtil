/**
 * 节流Hook，即使多次操作，一定时间内只能触发一次回调
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useThrottle = <V extends any[], R>(callBack: (...params: V) => R, countDown: number = 1000): ((...params: V) => R | void) => {
  let lock = false;
  return (...params) => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        lock = false;
      }, countDown);
      return callBack(...params);
    }
  };
};
