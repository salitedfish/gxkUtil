import type { ObjectType } from "../../type";
import { useDeepClone } from ".";

type FirstSignOptions<T> = {
  condition: (item: T) => any;
  pure?: boolean; // true不改变原数组，默认改变原数组
};

/**
 * 根据给定的条件,给数组中第一次满足的对象做标记
 * @param target
 * @param options 标记条件，是否改变原数组
 */
export function useSetFirstSign<T extends ObjectType>(target: T[]): (options: FirstSignOptions<T>) => (T & { firstSign?: true })[];
export function useSetFirstSign<T extends ObjectType>(target: T[], options: FirstSignOptions<T>): (T & { firstSign?: true })[];
export function useSetFirstSign<T extends ObjectType>(target: T[], options?: FirstSignOptions<T>) {
  type X = T & {
    firstSign?: true;
  };

  const handler = (options: FirstSignOptions<T>) => {
    const _target = options.pure ? useDeepClone(target)(true) : target;
    const signMap = new Map();
    for (let key in target) {
      const targetValue = options.condition(target[key]);
      /**如果signMap中不存在_targetValue,则设置标记 */
      if (!signMap.get(targetValue)) {
        signMap.set(targetValue, key);
        (_target[key] as X).firstSign = true;
      }
    }
    return _target as X[];
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
