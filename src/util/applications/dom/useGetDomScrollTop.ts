import { useGetDom } from ".";

/**
 * 获取dom的scrollTop值
 * @param target
 * @returns
 */
export const useGetDomScrollTop = (target: string) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  const scrollTops = [];
  for (let i = 0; i <= targetDom.length - 1; i++) {
    scrollTops.push(targetDom[i].scrollTop);
  }
  return scrollTops;
};
