import { useCurryTwo } from "../../../util/currying";
import { useGetDom } from ".";

/**
 * 添加目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
const useAddDomClassShallow = (target: string, classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.add(...classNames);
  }
};
export const useAddDomClass = useCurryTwo(useAddDomClassShallow);
