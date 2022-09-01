import { useGenTimeStamp } from ".";
import { useCurryTwo } from "../../../util/currying";

/**
 * 判断目标时间是否比参照时间早
 * @param targetTime 目标时间戳毫秒或时间格式字符串，如果是字符串要求从年开始。
 * @param referenceTime 参照时间戳毫秒或时间格式字符串，如果是字符串要求从年开始。
 */
const useIsEarlyShallow = (targetTime: number | string, referenceTime: number | string) => {
  return useGenTimeStamp(targetTime) < useGenTimeStamp(referenceTime);
};
export const useIsEarly = useCurryTwo(useIsEarlyShallow);
