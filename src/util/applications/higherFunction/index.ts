/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UseThrottling = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 节流Hook
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useThrottling: UseThrottling = (callBack, countDown = 1000) => {
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UseTimesClick = <V extends any[], R>(callBack: (...params: V) => R, option?: { times?: number; countDown?: number; interval?: number }) => (...params: V) => R | void;
/**
 * 多次点击Hook,支持节流
 * @param callBack
 * @param option 可选参数times默认两次，countDown持续500ms, interval间隔0秒
 * @returns
 */
export const useTimesClick: UseTimesClick = (callBack, option) => {
  let times = 0;
  let lock = false;
  let timer: NodeJS.Timeout;
  let op = {
    ...{
      times: 2,
      countDown: 500,
      interval: 0,
    },
    ...option,
  };
  return (...params) => {
    if (!lock) {
      if (!timer) {
        timer = setTimeout(() => {
          times = 0;
          clearTimeout(timer);
        }, op.countDown);
      }
      times = times + 1;
      if (times === op.times) {
        lock = true;
        setTimeout(() => {
          lock = false;
        }, op.interval);
        return callBack(...params);
      }
    }
  };
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * promise返回结果后，如果满足条件则返回，否则继续执行，直到最终满足条件或达到最大次数
 * @param asyncCallBack
 * @param options count 最大请求次数，默认3， countDown 请求返回后间隔多少时间请求一次，默认500
 * @param isCondition 判断是否满足条件的函数，返回true表示满足, 默认返回有值则满足条件
 * @returns 返回一个直到结果为true才返回promise的函数
 */
export function usePromiseInsist<V extends any[], T>(
  asyncCallBack: (...params: V) => Promise<T>,
  options?: { count?: number; countDown?: number }
): (isCondition: (params: T) => boolean) => (...params: V) => Promise<T>;
export function usePromiseInsist<V extends any[], T>(
  asyncCallBack: (...params: V) => Promise<T>,
  options: { count?: number; countDown?: number },
  isCondition: (params: T) => boolean
): (...params: V) => Promise<T>;
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options: { count?: number; countDown?: number } = {}, isCondition?: (params: T) => boolean): any {
  const handler = (isCondition: (params: T) => boolean): ((...params: V) => Promise<T>) => {
    const resOptions = { count: 3, countDown: 500, ...options };
    let count = 0;
    return (...params) => {
      return new Promise((resolve, reject) => {
        const handler = async () => {
          count = count + 1;
          try {
            const result = await asyncCallBack(...params);
            if (isCondition(result)) {
              /**满足条件返回 */
              resolve(result);
            } else if (count > resOptions.count) {
              /**超出最大次数返回reject */
              reject("Exceeded times");
            } else {
              /**否则继续执行 */
              setTimeout(handler, resOptions.countDown);
            }
          } catch (error) {
            reject(error);
          }
        };
        setTimeout(handler, resOptions.countDown);
      });
    };
  };
  /**Currying */
  if (isCondition === undefined) {
    return handler;
  } else {
    return handler(isCondition);
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// type UseAsync = <T extends any[], V>(asyncCallBack: (...params: T) => Promise<V | void>) => (...params: T) => <U>(defaultValue: U, errCallBack?: (err: unknown) => void) => Promise<V | U>;
// /**
//  * 旨在对async 和 await的封装，可以传入当异步没返回值或异步出错时的默认返回值和异常回调函数
//  * @param asyncCallBack
//  * @returns
//  */
// export const useAsync: UseAsync = (asyncCallBack) => {
//   return (...params) => {
//     return async (defaultValue, errCallBack) => {
//       try {
//         const res = await asyncCallBack(...params);
//         if (res) {
//           return res;
//         } else {
//           errCallBack ? errCallBack(res) : null;
//           return Promise.reject(defaultValue);
//         }
//       } catch (err) {
//         errCallBack ? errCallBack(err) : null;
//         return Promise.reject(defaultValue);
//       }
//     };
//   };
// };
