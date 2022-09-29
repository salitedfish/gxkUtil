type UseThrottle = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 节流Hook，即使多次操作，一定时间内只能触发一次回调
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useThrottle: UseThrottle = (callBack, countDown = 1000) => {
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
