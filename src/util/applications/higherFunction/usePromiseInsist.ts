/**
 * promise返回结果后，如果满足条件则返回，否则继续执行，直到最终满足条件或达到最大次数
 * @param asyncCallBack
 * @param options count 最大请求次数，默认3， interval 请求返回后间隔多少时间请求一次，默认500
 * @param condition 判断是否满足条件的函数，返回true表示满足
 * @returns 返回一个直到结果为true才返回promise的函数
 */
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options: { count?: number; interval?: number }, condition: (params: T) => boolean): (...params: V) => Promise<T>;
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options?: { count?: number; interval?: number }): (condition: (params: T) => boolean) => (...params: V) => Promise<T>;
export function usePromiseInsist<V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, options: { count?: number; interval?: number } = {}, condition?: (params: T) => boolean): any {
  const handler = (condition: (params: T) => boolean): ((...params: V) => Promise<T>) => {
    const resOptions = { count: 3, interval: 500, ...options };
    let count = 0;
    return (...params) => {
      return new Promise((resolve, reject) => {
        const handler = async () => {
          count = count + 1;
          try {
            const result = await asyncCallBack(...params);
            if (condition(result)) {
              /**满足条件返回 */
              resolve(result);
            } else if (count > resOptions.count) {
              /**超出最大次数返回reject */
              reject("Exceeded times");
            } else {
              /**否则继续执行 */
              setTimeout(handler, resOptions.interval);
            }
          } catch (error) {
            reject(error);
          }
        };
        /**开始先请求一次 */
        handler();
      });
    };
  };
  /**Currying */
  if (condition === undefined) {
    return handler;
  } else {
    return handler(condition);
  }
}
