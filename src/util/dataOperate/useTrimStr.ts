import { useCurryTwo } from "../../util/currying";

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
