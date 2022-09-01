type UseDebounce = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 防抖Hook
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useDebounce: UseDebounce = (callBack, countDown = 1000) => {
  let timer: NodeJS.Timeout;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      return callBack(...params);
    }, countDown);
  };
};
