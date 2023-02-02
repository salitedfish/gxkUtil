type DeepCloneOptions = {
  complete?: boolean;
};

/**
 * 深拷贝(其实原生就有深拷贝方式，如JSON、structuredClone，但还有无法完全使用的地方)
 * @param target 目标数据
 * @param options 配置
 * @returns
 */
export function useDeepClone<T extends any>(target: T, options: DeepCloneOptions): T;
export function useDeepClone<T extends any>(target: T): (options: DeepCloneOptions) => T;
export function useDeepClone<T extends any>(target: T, options?: DeepCloneOptions): T | ((options: DeepCloneOptions) => T) {
  const handler = (options: DeepCloneOptions) => {
    /**解构配置项 */
    const { complete } = options;
    if (!complete) {
      /**
       * JSON不能拷贝函数、Map、Set
       * JSON的拷贝会去除值为undefined的属性，数组中的undefined、NaN也会变为null
       */
      return JSON.parse(JSON.stringify(target));
    } else {
      /**
       * 通过递归遍历进行克隆每一项
       */
      if (Array.isArray(target)) {
        /**Array */
        const newData: any = [];
        for (const item of target) {
          newData.push(useDeepClone(item)({ complete: true }));
        }
        return newData;
      } else if (target instanceof Map) {
        /**Map */
        const newData: any = new Map();
        for (const [key, value] of target) {
          newData.set(key, useDeepClone(value)({ complete: true }));
        }
        return newData;
      } else if (target instanceof Set) {
        /**Set */
        const newData: any = new Set();
        for (const item of target) {
          newData.add(useDeepClone(item)({ complete: true }));
        }
        return newData;
      } else if ((target as Object)?.constructor === Object) {
        /**Object */
        const newData: any = {};
        for (const key in target) {
          newData[key] = useDeepClone(target[key])({ complete: true });
        }
        return newData;
      } else {
        /**简单类型或函数就直接返回 */
        return target;
      }
    }
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
