import type { ObjectType } from "../../type";
import { useDeepInclude } from ".";
import { useCurryTwo } from "../../util/currying";

/**
 * 检查对象或数组中是否包含null、0、NaN、undefined、空数组、空对象、""、空Set、空Map
 * @param target
 * @param exclude 排除的值
 * @returns
 */
const useCheckEmptyInObjShallow = (target: ObjectType, exclude: unknown[]) => {
  const referenceArr = [null, 0, NaN, undefined, [], {}, "", new Set(), new Map()];
  for (let key in target) {
    const item = target[key];
    /**如果包含在空值列表，但不包含在排除列表，则表示有空值 */
    if (useDeepInclude(referenceArr)({ condition: item, complete: true }) !== false && useDeepInclude(exclude)({ condition: item, complete: true }) === false) {
      return true;
    }
  }
  return false;
};
export const useCheckEmptyInObj = useCurryTwo(useCheckEmptyInObjShallow);
