import { useCheckSimpleData, useDeepEqual } from ".";

type DeepIncludeOptions<T> = {
  condition: T | ((item: T) => boolean);
  complete?: boolean;
};

/**
 * 深度判断数组中是否包含某个值或满足某个条件的值,无返回false,有则返回下标, 依赖useDeepEqual
 * @param origin 例如[{a:1}]
 * @param options 配置
 * @returns
 */
export function useDeepInclude<T>(origin: T[], options: DeepIncludeOptions<T>): false | string;
export function useDeepInclude<T>(origin: T[]): (options: DeepIncludeOptions<T>) => false | string;
export function useDeepInclude<T>(origin: T[], options?: DeepIncludeOptions<T>) {
  const handler = (options: DeepIncludeOptions<T>) => {
    /**解构配置项 */
    const { condition, complete } = options;
    for (const index in origin) {
      if (useCheckSimpleData(condition) && origin[index] === condition) {
        /**原始值 */
        return index;
      } else if (condition instanceof Function && condition(origin[index])) {
        /**函数条件 */
        return index;
      } else if (useDeepEqual(origin[index], condition)({ complete })) {
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
