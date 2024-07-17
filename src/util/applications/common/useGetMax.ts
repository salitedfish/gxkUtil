import { useCurryTwo } from "../../../util/currying";

/**
 * 获取数组中的最大值
 * @param arr
 * @param condition
 * @returns
 */
const useGetMaxShallow = <T>(arr: T[], condition: (item: T) => number) => {
  return Math.max(...arr.map((item) => condition(item)));
};

export const useGetMax = useCurryTwo(useGetMaxShallow);
