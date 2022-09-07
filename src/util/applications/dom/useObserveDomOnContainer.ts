import { useConsoleError } from "src/useInside";
import { useGetDom } from "./useGetDom";
import { useCurryThree } from "src/util/currying";

/**
 * 监听目标元素相对其祖先元素的位置
 * @param target
 * @param callback
 * @param option
 */
const useObserveDomOnContainerShallow = (target: string, callback: IntersectionObserverCallback, option?: IntersectionObserverInit) => {
  if (!window || !IntersectionObserver) {
    useConsoleError("useObserverDomOnVisibleArea: 当前环境不支持！");
  }
  const observer = new IntersectionObserver(callback, option);
  const targetDom = useGetDom(target)[0];
  observer.observe(targetDom);
  return observer;
};

export const useObserveDomOnContainer = useCurryThree(useObserveDomOnContainerShallow);
