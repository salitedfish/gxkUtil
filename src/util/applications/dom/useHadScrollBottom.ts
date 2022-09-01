import { useCurryTwo } from "../../../util/currying";
import { useGetDom } from ".";

/**
 * 判断容器中的滚动条是否滚动到页面底部
 * @param target
 * @param offect
 * @returns
 */
const useHadScrollBottomShallow = (target: string, offect: number = 0) => {
  let targetDom: HTMLElement | undefined = useGetDom(target)[0];
  if (!targetDom) {
    return false;
  } else {
    if (targetDom.scrollTop + targetDom.clientHeight + offect >= targetDom.scrollHeight) {
      return true;
    } else {
      return false;
    }
  }
};
export const useHadScrollBottom = useCurryTwo(useHadScrollBottomShallow);
