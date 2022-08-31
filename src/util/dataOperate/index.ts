import { useCurryTwo } from "../../util/currying";
import { ObjectType } from "../../type";
import { useConsoleError } from "src/useInside";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 检查参数中是否有undefined
 * @param argument
 * @returns
 */
export const useCheckUndefined = (...argument: any[]): boolean => {
  return argument.includes(undefined);
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 检查是否都是简单数据类型, string number boolean symbol null undefined
 * @param argument
 */
export const useCheckSimpleData = (...argument: any[]) => {
  for (let item of argument) {
    /**如果过既不在["string", "number", "boolean", "symbol", "undefined"]里也不是null，则表示是引用类型，返回false*/
    if (!["string", "number", "boolean", "symbol", "undefined"].includes(typeof item) && item !== null) {
      return false;
    }
  }
  return true;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 检查对象或数组中是否包含null、0、NaN、undefined、空数组、空对象、""、空Set、空Map
 * @param target
 * @param exclude 排除的值
 * @returns
 */
const useCheckEmptyInObjShallow = (target: ObjectType, exclude?: unknown[]) => {
  for (let key in target) {
    /**这里选出空值 */
    if (!target[key] || useDeepEqual(target[key], []) || useDeepEqual(target[key], {}) || useDeepEqual(target[key], new Set()) || useDeepEqual(target[key], new Map())) {
      /**如果exclude不存在或者exclude不包含此空值，说明此空值没有被排除，则返回true */
      if (!exclude || useDeepInclude(exclude)(target[key]) === false) {
        return true;
      }
    }
  }
  return false;
};
export const useCheckEmptyInObj = useCurryTwo(useCheckEmptyInObjShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断是不是正整数
 * @param num
 * @returns
 */
export const useIsPositiveInt = (num: number) => {
  /**排除0和NaN */
  if (!num || typeof num !== "number") {
    return false;
  }
  /**向下取整加取绝对值 */
  if (Math.abs(Math.floor(num)) === num) {
    return true;
  } else {
    return false;
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 深拷贝
 * @param target 目标数据
 * @param complete 是否完全深拷贝，默认为false
 * @returns
 */
export const useDeepClone = <T extends Object>(target: T, complete: boolean = false): T => {
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
        newData.push(useDeepClone(item, true));
      }
      return newData;
    } else if (target instanceof Map) {
      /**Map */
      const newData: any = new Map();
      for (const [key, value] of target) {
        newData.set(key, useDeepClone(value, true));
      }
      return newData;
    } else if (target instanceof Set) {
      /**Set */
      const newData: any = new Set();
      for (const item of target) {
        newData.add(useDeepClone(item, true));
      }
      return newData;
    } else if (target?.constructor === Object) {
      /**Object */
      const newData: any = {};
      for (const key in target) {
        newData[key] = useDeepClone(target[key], true);
      }
      return newData;
    } else {
      /**简单类型或函数就直接返回 */
      return target;
    }
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 深度比较是否相等
 * @param origin 例如: {a: 1}
 * @param target 例如: {a: 1}
 * @returns
 */
const useDeepEqualShallow = (origin: any, target: any) => {
  if (useCheckSimpleData(origin) || useCheckSimpleData(target)) {
    return origin === target;
    /**数组 */
  } else if (Array.isArray(origin) && Array.isArray(target)) {
    if (origin.length !== target.length) {
      return false;
    } else {
      for (let i = 0; i < origin.length; i++) {
        if (!useDeepEqual(origin[i], target[i])) {
          return false;
        }
      }
      return true;
    }
    /**Map */
  } else if (origin instanceof Map && target instanceof Map) {
    if (origin.size !== target.size) {
      return false;
    } else {
      for (const [key, value] of origin) {
        /**map这里如果key为对象的时候，如果两个key字面量相同，但是引用不同，则会判断为不同。
         * 因为有一个会找不到引用，导致target.get(key)找不到, 除非遍历套遍历，复杂度太高，还是算了
         */
        if (!useDeepEqual(value, target.get(key))) {
          return false;
        }
      }
      return true;
    }
    /**Set */
  } else if (origin instanceof Set && target instanceof Set) {
    if (origin.size !== target.size) {
      return false;
    } else {
      const originArr = Array.from(origin);
      const newArr = Array.from(target);
      if (!useDeepEqual(originArr, newArr)) {
        return false;
      }
      return true;
    }
    /**Object */
  } else if (origin.constructor === Object && target.constructor === Object) {
    if (Object.keys(origin).length !== Object.keys(target).length) {
      return false;
    } else {
      for (const key in origin) {
        if (!useDeepEqual(origin[key], target[key])) {
          return false;
        }
      }
      return true;
    }
  } else {
    return origin === target;
  }
};
export const useDeepEqual = useCurryTwo(useDeepEqualShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    for (const key in origin) {
      if (useCheckSimpleData(condition) && origin[key] === condition) {
        /**原始值 */
        return key;
      } else if (condition instanceof Function && condition(origin[key])) {
        /**函数条件 */
        return key;
      } else if (useDeepEqual(origin[key], condition)) {
        /**引用值 */
        return key;
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 深度数组去重，不改变原数组, 依赖useDeepInclude
 * @param oldArr
 * @returns
 */
export const useDeepRmRpt = <V>(oldArr: V[]): V[] => {
  const newArr: V[] = [];
  for (const item of oldArr) {
    if (useDeepInclude(newArr, item) === false) {
      newArr.push(item);
    }
  }
  return newArr;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 浅度数组去重，不改变原数组
 * @param oldArr
 * @returns
 */
export const useShallowRmRpt = <V>(oldArr: V[]): V[] => {
  return Array.from(new Set(oldArr));
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type GroupOption<T> = {
  conditions?: ((item: T) => boolean)[];
  arrayCount?: number;
  eatchCount?: number;
  condition?: (item: T) => unknown;
};
/**
 * 数组按要求分组
 * @param origin
 * @param options 每组满足的条件,每组几个,几个数组,分组条件
 */
export function useGroupBy<T>(origin: T[]): (options: GroupOption<T>) => T[][];
export function useGroupBy<T>(origin: T[], options: GroupOption<T>): T[][];
export function useGroupBy<T>(origin: T[], options?: GroupOption<T>) {
  const handler = (options: GroupOption<T>) => {
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
      return conditionsGroupHandler(origin, options.conditions);
    } else if (options.eatchCount) {
      /**每个数组有几项 */
      return countGroupHandler(origin, options.eatchCount);
    } else if (options.arrayCount) {
      /**分成几个数组 */
      const eatchCount = Math.floor(origin.length / options.arrayCount);
      return countGroupHandler(origin, eatchCount);
    } else if (options.condition) {
      /**整体条件 */
      return conditionGroupHandler(origin, options.condition);
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
  const _target = useDeepClone(target);
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type Position = "left" | "center" | "right" | "between";
/**
 * 根据提供的位置替换字符串
 * @param target
 * @param position
 * @param count 如果是两个值,第二个值表示从后面开始计数
 * @param replaceStr default: "*"
 */
export function useRepPartStr(target: string, position: "center" | "between", count: [number, number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: "left" | "right", count: [number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: Position, count: number[], replaceStr: string = "*"): string {
  if (["left", "right"].includes(position)) {
    /**二段 */
    const preStr = target.slice(0, count[0]);
    const nextStr = target.slice(count[0]);
    if (position === "left") {
      return preStr.replace(/./g, replaceStr) + nextStr;
    } else if (position === "right") {
      return preStr + nextStr.replace(/./g, replaceStr);
    }
  } else if (["center", "between"].includes(position)) {
    /**三段 */
    const preStr = target.slice(0, count[0]);
    const centerStr = target.slice(count[0], -count[1]);
    const nextStr = target.slice(-count[1]);
    if (position === "center") {
      return preStr + centerStr.replace(/./g, replaceStr) + nextStr;
    } else if (position === "between") {
      return preStr.replace(/./g, replaceStr) + centerStr + nextStr.replace(/./g, replaceStr);
    }
  }
  return target;
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type PositionTrim = "left" | "right" | "between" | "global";
/**
 * 去除字符串中的空格
 * @param target
 * @param position
 * @returns
 */
const useTrimStrShallow = (target: string, position?: PositionTrim) => {
  if (position === "left") {
    return target.replace(/^\s+/g, "");
  } else if (position === "right") {
    return target.replace(/\s+$/g, "");
  } else if (position === "between") {
    return target.replace(/^\s+|\s+$/g, "");
  } else {
    return target.replace(/\s+/g, "");
  }
};
export const useTrimStr = useCurryTwo(useTrimStrShallow);
