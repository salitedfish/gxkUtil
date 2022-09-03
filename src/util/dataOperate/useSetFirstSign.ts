import type { ObjectType } from "../../type";
import { useDeepClone } from ".";

/**
 * 根据给定的条件,给数组中第一次满足的对象做标记
 * @param target
 * @param condition 条件
 */
export function useSetFirstSign<T extends ObjectType>(target: T[]): (condition: (item: T) => any) => T & { firstSign?: true };
export function useSetFirstSign<T extends ObjectType>(target: T[], condition: (item: T) => any): T & { firstSign?: true };
export function useSetFirstSign<T extends ObjectType>(target: T[], condition?: (item: T) => any) {
  type X = T & {
    firstSign?: true;
  };
  const _target = useDeepClone(target)(true);
  const handler = (condition: (item: T) => any) => {
    const signMap = new Map();
    for (let key in target) {
      const targetValue = condition(target[key]);
      /**如果signMap中不存在_targetValue,则设置标记 */
      if (!signMap.get(targetValue)) {
        signMap.set(targetValue, key);
        (_target[key] as X).firstSign = true;
      }
    }
    return _target as X[];
  };
  /**Currying */
  if (condition === undefined) {
    return handler;
  } else {
    return handler(condition);
  }
}
