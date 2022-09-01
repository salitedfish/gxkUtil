import { useCheckSimpleData } from ".";
import { useCurryTwo } from "../../util/currying";

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
