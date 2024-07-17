import { useCurryTwo } from "../../../util/currying";

/**
 * 获取数组中的最小值
 * @param arr
 * @param condition
 * @returns
 */
const useGetMinShallow = <T>(arr: T[], condition: (item: T) => number) => {
  return Math.min(...arr.map((item) => condition(item)));
};

export const useGetMin = useCurryTwo(useGetMinShallow);
