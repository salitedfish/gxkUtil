import { useCheckSimpleData, useDeepEqual } from ".";

type DeepIncludeOptions<T> = {
  condition: T | ((item: T) => boolean);
  complete?: boolean;
};

/**
 * 深度判断数组中是否包含某个值或满足某个条件的值,无返回false,有则返回下标, 依赖useDeepEqual
 * @param origin 例如[{a:1}]
 * @param condition 例如 {a:1} 或 (item) => true
 * @returns
 */
export function useDeepInclude<T>(origin: T[]): (options: DeepIncludeOptions<T>) => false | string;
export function useDeepInclude<T>(origin: T[], options: DeepIncludeOptions<T>): false | string;
export function useDeepInclude<T>(origin: T[], options?: DeepIncludeOptions<T>) {
  const handler = (options: DeepIncludeOptions<T>) => {
    for (const index in origin) {
      if (useCheckSimpleData(options.condition) && origin[index] === options.condition) {
        /**原始值 */
        return index;
      } else if (options.condition instanceof Function && options.condition(origin[index])) {
        /**函数条件 */
        return index;
      } else if (useDeepEqual(origin[index], options.condition)({ complete: options.complete })) {
        /**引用值 */
        return index;
      }
    }
    return false;
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
