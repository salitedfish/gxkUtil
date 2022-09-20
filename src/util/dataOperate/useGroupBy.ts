import { useIsPositiveInt, useDeepClone } from ".";
import { useConsoleError } from "../../useInside";

type GroupOption<T> = {
  conditions?: ((item: T) => boolean)[];
  arrayCount?: number;
  eatchCount?: number;
  condition?: (item: T) => unknown;
  pure?: boolean; // true为不改变原数组，默认改变原数组
};
/**
 * 数组按要求分组
 * @param origin
 * @param options 每组满足的条件,每组几个,几个数组,分组条件，是否改变原数组
 */
export function useGroupBy<T>(origin: T[]): (options: GroupOption<T>) => T[][];
export function useGroupBy<T>(origin: T[], options: GroupOption<T>): T[][];
export function useGroupBy<T>(origin: T[], options?: GroupOption<T>) {
  const handler = (options: GroupOption<T>) => {
    const _origin = options.pure ? useDeepClone(origin)(true) : origin;
    const resGroup: T[][] = [];

    const conditionsGroupHandler = (arr: T[], conditions: ((item: T) => boolean)[]) => {
      for (let item of conditions) {
        const group = [];
        for (let i of arr) {
          if (item(i)) {
            group.push(i);
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
      useConsoleError("useGroupBy: 分组条件不正确!");
      return [];
    }
    return handler(options);
  }
}
