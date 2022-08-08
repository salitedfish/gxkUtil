import { useCurryTwo } from "../../util/currying";
import { ObjectType } from "../../type";
import { useConsoleWarn } from "src/useInside";

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
 * 检查是否含有简单数据类型, string number boolean null undefined
 * @param argument
 */
export const useCheckSimpleData = (...argument: any[]) => {
  for (let item of argument) {
    if (["string", "number", "boolean"].includes(typeof item) || [null, undefined].includes(item)) {
      return true;
    }
  }
  return false;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 检查对象或数组中是否包含null、0、NaN、undefined、空数组、空对象、""
 * @param target
 * @param exclude 排除的值
 * @returns
 */
const useCheckEmptyInObjShallow = (target: ObjectType, exclude?: unknown[]) => {
  let hasEmpty = false;
  for (let key in target) {
    if (!target[key] || useDeepEqual(target[key], []) || useDeepEqual(target[key], {})) {
      if (!exclude || useDeepFindIndex(exclude)(target[key]) === false) {
        hasEmpty = true;
      }
    }
  }
  return hasEmpty;
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
  if (!num) {
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
 * @param oldData
 * @returns
 */
export const useDeepClone = <T>(oldData: T): T => {
  if (useCheckSimpleData(oldData)) {
    return oldData;
  } else if (Array.isArray(oldData)) {
    const newData: any = [];
    for (const item of oldData) {
      newData.push(useDeepClone(item));
    }
    return newData;
  } else if (oldData instanceof Map) {
    const newData: any = new Map();
    for (const [key, value] of oldData) {
      newData.set(key, useDeepClone(value));
    }
    return newData;
  } else if (oldData instanceof Set) {
    const newData: any = new Set();
    for (const item of oldData) {
      newData.add(useDeepClone(item));
    }
    return newData;
  } else if (typeof oldData === "object") {
    const newData: any = {};
    for (const key in oldData) {
      newData[key] = useDeepClone(oldData[key]);
    }
    return newData;
  } else {
    return oldData;
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
  if (useCheckSimpleData(origin, target)) {
    return origin === target;
  } else {
    if (Array.isArray(origin) && Array.isArray(target)) {
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
    } else if (origin instanceof Map && target instanceof Map) {
      /**map这里如果key为对象的时候，如果两个key深度相同，但是引用不同，会判断为不同，因为有一个会找不到 */
      if (origin.size !== target.size) {
        return false;
      } else {
        for (const [key, value] of origin) {
          if (!useDeepEqual(value, target.get(key))) {
            return false;
          }
        }
        return true;
      }
    } else if (origin instanceof Set && target instanceof Set) {
      if (origin.size !== target.size) {
        return false;
      } else {
        const originArr = Array.from(origin);
        const newArr = Array.from(target);
        for (let i = 0; i < originArr.length; i++) {
          if (!useDeepEqual(originArr[i], newArr[i])) {
            return false;
          }
        }
        return true;
      }
    } else if (typeof origin === "object" && typeof target === "object") {
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
export function useDeepFindIndex<T>(origin: T[]): (condition: T | ((item: T) => boolean)) => false | string;
export function useDeepFindIndex<T>(origin: T[], condition: T | ((item: T) => boolean)): false | string;
export function useDeepFindIndex<T>(origin: T[], condition?: T | ((item: T) => boolean)) {
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
  if (condition === undefined) {
    return handler;
  } else {
    return handler(condition);
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 深度数组去重，不改变原数组, 依赖useDeepFindIndex
 * @param oldArr
 * @returns
 */
export const useDeepRmRpt = <V>(oldArr: V[]): V[] => {
  const newArr: V[] = [];
  for (const item of oldArr) {
    if (useDeepFindIndex(newArr, item) === false) {
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
  condition?: ((param: T) => boolean)[];
  arrayCount?: number;
  eatchCount?: number;
};
/**
 * 数组按要求分组
 * @param origin
 * @param options 条件数组或者每组几个或几个数组
 */
export function useGroupBy<T>(origin: T[]): (options: GroupOption<T>) => T[][];
export function useGroupBy<T>(origin: T[], options: GroupOption<T>): T[][];
export function useGroupBy<T>(origin: T[], options?: GroupOption<T>) {
  const handler = (options: GroupOption<T>) => {
    const resGroup: T[][] = [];
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
    if (Array.isArray(options.condition)) {
      for (let item of options.condition) {
        const group = [];
        for (let i of origin) {
          if (item(i)) {
            group.push(i);
          }
        }
        resGroup.push(group);
      }
      return resGroup;
    } else if (options.eatchCount) {
      return countGroupHandler(origin, options.eatchCount);
    } else if (options.arrayCount) {
      const arrayCount = Math.floor(origin.length / options.arrayCount);
      return countGroupHandler(origin, arrayCount);
    } else {
      return resGroup;
    }
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    if (options?.arrayCount && !useIsPositiveInt(options?.arrayCount) && options?.eatchCount && !useIsPositiveInt(options?.eatchCount)) {
      useConsoleWarn("useGroupBy: 分组条件不正确!");
      return [];
    }
    return handler(options);
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type SetFirstSignOption<T, K extends keyof T> = {
  targetKey: K;
  condition?: (item: T[K]) => any;
};
/**
 * 根据给定的键和条件,给数组中第一次满足的对象做标记
 * @param target
 * @param options
 */
export function useSetFirstSign<T extends any, K extends keyof T>(target: T[]): (options: SetFirstSignOption<T, K>) => T & { firstSign?: true };
export function useSetFirstSign<T extends any, K extends keyof T>(target: T[], options: SetFirstSignOption<T, K>): T & { firstSign?: true };
export function useSetFirstSign<T extends any, K extends keyof T>(target: T[], options?: SetFirstSignOption<T, K>) {
  type X = T & {
    firstSign?: true;
  };
  const _target = useDeepClone(target);
  const handler = (options: SetFirstSignOption<T, K>) => {
    const signMap = new Map();
    for (let key in target) {
      const targetValue = target[key][options.targetKey];
      const _targetValue = options.condition ? options.condition(target[key][options.targetKey]) : targetValue;
      /**如果signMap中不存在_targetValue,则设置标记 */
      if (!signMap.get(_targetValue) && targetValue) {
        signMap.set(_targetValue, key);
        (_target[key] as X).firstSign = true;
      }
    }
    return _target as X[];
  };
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type Position = "head" | "center" | "tail" | "between";
/**
 * 根据提供的位置替换字符串
 * @param target
 * @param position
 * @param count 如果是两个值,第二个值表示从后面开始计数
 * @param replaceStr default: "*"
 */
export function useRepPartStr(target: string, position: "center" | "between", count: [number, number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: "head" | "tail", count: [number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: Position, count: number[], replaceStr: string = "*"): string {
  if (["head", "tail"].includes(position)) {
    /**二段 */
    const preStr = target.slice(0, count[0]);
    const nextStr = target.slice(count[0]);
    if (position === "head") {
      return preStr.replace(/./g, replaceStr) + nextStr;
    } else if (position === "tail") {
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
type PositionTrim = "head" | "tail" | "between" | "global";
/**
 * 去除字符串中的空格
 * @param target
 * @param position
 * @returns
 */
const useTrimStrShallow = (target: string, position?: PositionTrim) => {
  if (position === "head") {
    return target.replace(/^\s+/g, "");
  } else if (position === "tail") {
    return target.replace(/\s+$/g, "");
  } else if (position === "between") {
    return target.replace(/^\s+|\s+$/g, "");
  } else {
    return target.replace(/\s+/g, "");
  }
};
export const useTrimStr = useCurryTwo(useTrimStrShallow);
