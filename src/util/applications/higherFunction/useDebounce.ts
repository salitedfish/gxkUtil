/**
 * 防抖Hook，多次操作，也只有最后一次触发回调
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useDebounce = <V extends any[], R>(callBack: (...params: V) => R, countDown: number = 1000): ((...params: V) => R | void) => {
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
