import { useIsPositiveInt, useDeepClone } from ".";
import { useConsoleError } from "../../useInside";

type GroupOption<T> = {
  conditions?: ((item: T) => boolean)[]; // 比如条件为[item.a > 1, item.b > 100]，则最终分组是按照item.a > 1一组，item.b > 100 一组
  arrayCount?: number; // 按组数分组
  eatchCount?: number; // 按每组个数分组
  condition?: (item: T) => unknown; // 比如条件返回item.a，则最终的分组是按照item.a不同值进行分组
  pure?: boolean; // true则结果数据和原数据无关联，否则还存在引用关联
  complete?: boolean; // 只有当pure为true时才有效，判断通过递归方式、JSON方式进行深拷贝
};
/**
 * 数组按要求分组
 * @param origin
 * @param options 每组满足的条件,每组几个,几个数组,分组条件，是否纯净
 */
export function useGroupByCondition<T>(origin: T[]): (options: GroupOption<T>) => T[][];
export function useGroupByCondition<T>(origin: T[], options: GroupOption<T>): T[][];
export function useGroupByCondition<T>(origin: T[], options?: GroupOption<T>) {
  const handler = (options: GroupOption<T>) => {
    const _origin = options.pure ? useDeepClone(origin)({ complete: options.complete || false }) : origin;
    const resGroup: T[][] = [];
    const conditionsGroupHandler = (arr: T[], conditions: ((item: T) => boolean)[]) => {
      for (let condition of conditions) {
        const group = [];
        for (let item of arr) {
          if (condition(item)) {
            group.push(item);
          }
        }
        resGroup.push(group);
      }
      return resGroup;
    };
    const countGroupHandler = (arr: T[], num: number): T[][] => {
      if (arr.length <= num) {
        resGroup.push(arr);
        return resGroup;
      } else {
        const res: T[] = [];
        let count = 0;
        for (let item of arr) {
          res.push(item);
          count++;
          if (count >= num) {
            resGroup.push(res);
            break;
          }
        }
        return countGroupHandler(arr.slice(num), num);
      }
    };
    const conditionGroupHandler = (arr: T[], condition: (item: T) => unknown) => {
      const _map = new Map();

      for (let item of arr) {
        const cond = condition(item);
        if (_map.has(cond)) {
          const condArr = _map.get(cond);
          condArr.push(item);
          _map.set(cond, condArr);
        } else {
          _map.set(cond, [item]);
        }
      }
      for (let item of _map.values()) {
        resGroup.push(item);
      }
      return resGroup;
    };
    /**不同分组条件判断 */
    if (Array.isArray(options.conditions)) {
      /**具体到每组的条件 */
      return conditionsGroupHandler(_origin, options.conditions);
    } else if (options.eatchCount) {
      /**每个数组有几项 */
      return countGroupHandler(_origin, options.eatchCount);
    } else if (options.arrayCount) {
      /**分成几个数组 */
      const eatchCount = Math.floor(origin.length / options.arrayCount);
      return countGroupHandler(_origin, eatchCount);
    } else if (options.condition) {
      /**整体条件 */
      return conditionGroupHandler(_origin, options.condition);
    } else {
      return resGroup;
    }
  };

  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    if ((options?.arrayCount && !useIsPositiveInt(options?.arrayCount)) || (options?.eatchCount && !useIsPositiveInt(options?.eatchCount))) {
      useConsoleError("useGroupByCondition: 分组条件不正确!");
      return [];
    }
    return handler(options);
  }
}
