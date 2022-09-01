import { useCurryTwo } from "../../../util/currying";

/**
 * 从URL中获取文件名、文件名.扩展名
 * @param URL
 * @param withExt true表示携带扩展名
 * @returns
 */
const useFileNameFromURLShallow = (URL: string, withExt: boolean = false) => {
  const firstIndex = URL.lastIndexOf("/") + 1;
  const lastIndex = URL.lastIndexOf(".");
  if (withExt) {
    return URL.slice(firstIndex);
  } else {
    return URL.slice(firstIndex, lastIndex);
  }
};
export const useFileNameFromURL = useCurryTwo(useFileNameFromURLShallow);
