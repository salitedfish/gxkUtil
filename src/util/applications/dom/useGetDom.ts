import { useConsoleWarn } from "../../../useInside";

/**
 * 获取目标dom
 * @param target
 * @returns
 */
export const useGetDom = (target: string) => {
  let targetDom: NodeListOf<HTMLElement> = window.document.querySelectorAll(target);
  if (targetDom.length === 0) {
    useConsoleWarn("useGetDom: 没获取到dom!");
  }
  return targetDom;
};
