/**
 * promise返回结果后，如果满足条件则返回，否则继续执行，直到最终满足条件或达到最大次数
 * @param asyncCallBack
 * @param options max 最大请求次数，默认3， interval 请求返回后间隔多少时间请求一次，默认500
 * @param condition 判断是否满足条件的函数，返回true表示满足
 * @returns 返回一个直到结果为true才返回promise的函数
 */
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options: { max?: number; interval?: number }, condition: (params: T) => boolean): [(...params: V) => Promise<T>, () => void];
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options?: { max?: number; interval?: number }): (condition: (params: T) => boolean) => [(...params: V) => Promise<T>, () => void];
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options: { max?: number; interval?: number } = {}, condition?: (params: T) => boolean): any {
  const handler = (condition: (params: T) => boolean): [(...params: V) => Promise<T>, () => void] => {
    const resOptions = { max: 3, interval: 500, ...options };
    let count = 0;
    let cancel = false;
    const cancelPromise = () => {
      cancel = true;
    };
    /**最终调用的异步函数 */
    return [
      (...params) => {
        cancel = false;
        return new Promise((resolve, reject) => {
          const reqHandler = async () => {
            count = count + 1;
            try {
              const result = await asyncCallBack(...params);
              if (condition(result)) {
                /**满足条件返回 */
                resolve(result);
              } else if (count > resOptions.max) {
                /**超出最大次数返回reject */
                reject(result);
              } else if (cancel) {
                /**手动取消继续 */
                reject(result);
              } else {
                /**否则继续执行 */
                setTimeout(reqHandler, resOptions.interval);
              }
            } catch (error) {
              reject(error);
            }
          };
          /**开始先请求一次 */
          reqHandler();
        });
      },
      cancelPromise,
    ];
  };
  /**Currying */
  if (condition === undefined) {
    return handler;
  } else {
    return handler(condition);
  }
}
