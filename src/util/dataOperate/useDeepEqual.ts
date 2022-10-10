import { useCheckSimpleData } from ".";
import { useCurryThree } from "../../util/currying";

type DeepEqualOptions = {
  complete?: boolean; // 是否完全使用递归进行逐一比较，比较完全，但是消耗性能
};

/**
 * 深度比较是否相等
 * @param origin 例如: {a: 1}
 * @param target 例如: {a: 1}
 * @returns
 */
const useDeepEqualShallow = (origin: any, target: any, options: DeepEqualOptions) => {
  /**
   * 通过转化为JSON字符串进行比较
   * 如果比较的两个值都是对象或原始值的数组，不包含set、map、undefined、NaN等
   */
  if (!options.complete) {
    return JSON.stringify(origin) === JSON.stringify(target);
  }
  /**
   * 通过递归遍历每一项进行比较
   */
  if (useCheckSimpleData(origin) || useCheckSimpleData(target)) {
    return origin === target;
    /**数组 */
  } else if (Array.isArray(origin) && Array.isArray(target)) {
    if (origin.length !== target.length) {
      return false;
    } else {
      for (let i = 0; i < origin.length; i++) {
        if (!useDeepEqualShallow(origin[i], target[i], options)) {
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
        if (!useDeepEqualShallow(value, target.get(key), options)) {
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
      if (!useDeepEqualShallow(originArr, newArr, options)) {
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
        if (!useDeepEqualShallow(origin[key], target[key], options)) {
          return false;
        }
      }
      return true;
    }
  } else {
    return origin === target;
  }
};
export const useDeepEqual = useCurryThree(useDeepEqualShallow);
