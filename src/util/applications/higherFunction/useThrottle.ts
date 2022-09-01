type UseThrottle = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 节流Hook
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
