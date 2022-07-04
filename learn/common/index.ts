/**
 * Promise.all的实现
 * @param promiseArray
 * @returns
 */
export const myPromiseAll = (promiseArray: Promise<unknown>[]): Promise<unknown[]> => {
  const resArray: unknown[] = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    /**判断函数 */
    const analy = (index: number, length: number) => {
      if (index == length) {
        resolve(resArray);
      } else {
        index++;
        next();
      }
    };
    /**递归函数 */
    const next = () => {
      /**如果是promise */
      if (promiseArray[index] instanceof Promise) {
        promiseArray[index]
          .then((res) => {
            resArray.push(res);
            analy(index, promiseArray.length - 1);
          })
          .catch((err) => {
            /**如果有错直接reject出去 */
            reject(err);
          });
        /**如果不是promise */
      } else {
        resArray.push(promiseArray[index]);
        analy(index, promiseArray.length - 1);
      }
    };
    next();
  });
};

Promise.all = myPromiseAll;

/**Omit高级类型 */
type a = { a: 1; b: 2 };
type b = Omit<a, "a">;

const B: b = {
  b: 2,
};

/**Pick高级类型 */
type d = Pick<a, "a">;

const D: d = {
  a: 1,
};

/**Record高级类型 */
/**Exclude高级类型 */
/**Extract高级类型 */
/**ReturnType高级类型 */
