import { usePromiseInsist } from "./index";
type PromiseQueueOptions = { count?: number; interval?: number; insist?: boolean };

/**
 * 一次执行数组中的promise，可以配置单个请求失败是否继续执行这个请求
 * @param promiseList
 * @param options
 * @returns
 */
export const usePromiseQueue = <T>(promiseList: (() => Promise<T>)[], condition: (res: T) => boolean, options: PromiseQueueOptions = {}) => {
  return new Promise((resolve, reject) => {
    const resArray: T[] = [];
    let res: T;
    const handler = async () => {
      for (const promiseHandler of promiseList) {
        // insist为true，则单个请求没满足条件，会继续按照配置执行这个请求，直到超过配置的次数还没满足条件则返回reject
        // insist为false，则单个请求没满足条件则返回reject
        const _promiseHandler = options.insist ? usePromiseInsist(promiseHandler, options, condition) : promiseHandler;
        try {
          res = await _promiseHandler();
          if (!options.insist && !condition(res)) {
            return reject(resArray);
          }
          resArray.push(res);
        } catch (err) {
          return reject(resArray);
        }
      }
      return resolve(resArray);
    };
    handler();
  });
};
