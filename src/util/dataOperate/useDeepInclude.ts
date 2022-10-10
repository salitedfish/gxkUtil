import { useCheckSimpleData, useDeepEqual } from ".";

/**
 * 深度判断数组中是否包含某个值或满足某个条件的值,无返回false,有则返回下标, 依赖useDeepEqual
 * @param origin 例如[{a:1}]
 * @param condition 例如 {a:1} 或 (item) => true
 * @returns
 */
export function useDeepInclude<T>(origin: T[]): (condition: T | ((item: T) => boolean)) => false | string;
export function useDeepInclude<T>(origin: T[], condition: T | ((item: T) => boolean)): false | string;
export function useDeepInclude<T>(origin: T[], condition?: T | ((item: T) => boolean)) {
  const handler = (condition: T | ((item: T) => boolean)) => {
    for (const index in origin) {
      if (useCheckSimpleData(condition) && origin[index] === condition) {
        /**原始值 */
        return index;
      } else if (condition instanceof Function && condition(origin[index])) {
        /**函数条件 */
        return index;
      } else if (useDeepEqual(origin[index], condition)({ complete: true })) {
        /**引用值 */
        return index;
      }
    }
    return false;
  };
  /**Currying */
  if (condition === undefined) {
    return handler;
  } else {
    return handler(condition);
  }
}
