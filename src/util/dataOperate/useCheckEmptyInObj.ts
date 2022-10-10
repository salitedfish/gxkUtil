import type { ObjectType } from "../../type";
import { useDeepEqual, useDeepInclude } from ".";
import { useCurryTwo } from "../../util/currying";

/**
 * 检查对象或数组中是否包含null、0、NaN、undefined、空数组、空对象、""、空Set、空Map
 * @param target
 * @param exclude 排除的值
 * @returns
 */
const useCheckEmptyInObjShallow = (target: ObjectType, exclude?: unknown[]) => {
  for (let key in target) {
    /**这里选出空值 */
    const useTargetDeepEqual = useDeepEqual(target[key]);
    if (!target[key] || useTargetDeepEqual([])({ complete: true }) || useTargetDeepEqual({})({ complete: true }) || useTargetDeepEqual(new Set())({ complete: true }) || useTargetDeepEqual(new Map())({ complete: true })) {
      /**如果exclude不存在或者exclude不包含此空值，说明此空值没有被排除，则返回true */
      if (!exclude || useDeepInclude(exclude)(target[key]) === false) {
        return true;
      }
    }
  }
  return false;
};
export const useCheckEmptyInObj = useCurryTwo(useCheckEmptyInObjShallow);
