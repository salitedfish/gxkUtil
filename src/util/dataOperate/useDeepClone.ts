/**
 * 深拷贝
 * @param target 目标数据
 * @param complete 是否完全深拷贝，默认为false
 * @returns
 */
export function useDeepClone<T extends any>(target: T): (complete: boolean) => T;
export function useDeepClone<T extends any>(target: T, complete: boolean): T;
export function useDeepClone<T extends any>(target: T, complete?: boolean): T | ((complete: boolean) => T) {
  const handler = (complete: boolean) => {
    /**
     * 如果不需要拷贝函数、Map、Set，就直接用JSON拷贝
     * JSON的拷贝会去除值为undefined的属性，数组中的undefined、NaN也会变为null
     */
    if (!complete) {
      return JSON.parse(JSON.stringify(target));
    } else {
      if (Array.isArray(target)) {
        /**Array */
        const newData: any = [];
        for (const item of target) {
          newData.push(useDeepClone(item)(true));
        }
        return newData;
      } else if (target instanceof Map) {
        /**Map */
        const newData: any = new Map();
        for (const [key, value] of target) {
          newData.set(key, useDeepClone(value)(true));
        }
        return newData;
      } else if (target instanceof Set) {
        /**Set */
        const newData: any = new Set();
        for (const item of target) {
          newData.add(useDeepClone(item)(true));
        }
        return newData;
      } else if (target?.constructor === Object) {
        /**Object */
        const newData: any = {};
        for (const key in target) {
          newData[key] = useDeepClone(target[key])(true);
        }
        return newData;
      } else {
        /**简单类型或函数就直接返回 */
        return target;
      }
    }
  };
  /**Currying */
  if (complete === undefined) {
    return handler;
  } else {
    return handler(complete);
  }
}
