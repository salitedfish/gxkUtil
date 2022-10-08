import type { ObjectType } from "../../type";
import { useDeepClone } from ".";

type FirstSignOptions<T> = {
  condition: (item: T) => any;
  pure?: boolean; // true则结果数据和原数据无关，否则是在原数据上改
  complete?: boolean; // 只有当pure为true时才有效，判断通过递归方式、JSON方式进行深拷贝
};

/**
 * 根据给定的条件,给数组中第一次满足的对象做标记
 * @param target
 * @param options 标记条件，是否纯净
 */
export function useSetFirstSign<T extends ObjectType>(target: T[]): (options: FirstSignOptions<T>) => (T & { firstSign?: true })[];
export function useSetFirstSign<T extends ObjectType>(target: T[], options: FirstSignOptions<T>): (T & { firstSign?: true })[];
export function useSetFirstSign<T extends ObjectType>(target: T[], options?: FirstSignOptions<T>) {
  type X = T & {
    firstSign?: true;
  };

  const handler = (options: FirstSignOptions<T>) => {
    const _target = options.pure ? useDeepClone(target)(options.complete || false) : target;
    /**用来保存出现过的条件值 */
    const signMap = new Set();
    for (let item of _target) {
      const targetValue = options.condition(item);
      /**如果signMap中不存在_targetValue,则设置标记 */
      if (!signMap.has(targetValue)) {
        signMap.add(targetValue);
        (item as X).firstSign = true;
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
