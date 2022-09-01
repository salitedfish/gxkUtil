import { useCurryTwo } from "../../../util/currying";
import { useConsoleWarn } from "../../../useInside";
import { useGetDom } from ".";

type GetStyleName = keyof CSSStyleDeclaration & string;
/**
 * 获取dom的style各属性值
 * @param target
 * @param styleName 如：width
 * @returns
 */
const useGetDomStyleShallow = (target: string, styleName: GetStyleName): string[] => {
  if (!window || !window.getComputedStyle) {
    useConsoleWarn("useGetDomStyle: window或window.getComputedStyle不存在");
    return [];
  }
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  const styles = [];
  for (let i = 0; i <= targetDom.length - 1; i++) {
    /**dom.style只能获取到内联style的属性值，所以用这种方式获取 */
    styles.push(window.getComputedStyle(targetDom[i]).getPropertyValue(styleName));
  }
  return styles;
};
export const useGetDomStyle = useCurryTwo(useGetDomStyleShallow);
