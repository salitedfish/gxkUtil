import { useCurryTwo } from "../../../util/currying";
import { useGetDom } from ".";

/**
 * 设置dom的scrollTop值
 * @param target
 * @param scrollTop
 * @returns
 */
const useSetDomScrollTopShallow = (target: string, scrollTop: number) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].scrollTop = scrollTop;
  }
};
export const useSetDomScrollTop = useCurryTwo(useSetDomScrollTopShallow);
