import { useCurryTwo } from "../../../util/currying";
import { useGetDom } from ".";

/**
 * 移除目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
const useRmDomClassShallow = (target: string, classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.remove(...classNames);
  }
};
export const useRmDomClass = useCurryTwo(useRmDomClassShallow);
