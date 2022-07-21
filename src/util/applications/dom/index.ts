import { useCurryTwo } from "../../../util/currying";
import { useConsoleWarn } from "../../../useInside";
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 设置页面的title
 * @param title
 */
export const useSetHTMLTitle = (title: string): void => {
  const titleDom = window.document.getElementsByTagName("title")[0];
  titleDom.innerText = title;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 获取目标dom
 * @param target
 * @returns
 */
export const useGetDom = (target: string) => {
  let targetDom: NodeListOf<HTMLElement> = document.querySelectorAll(target);
  if (targetDom.length === 0) {
    useConsoleWarn("useGetDom: 没获取到dom!");
  }
  return targetDom;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
export const useAddDomClass = useCurryTwo<[target: string], [classNames: string[]], void>(useAddDomClassShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 移除目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
const useRemoveDomClassShallow = (target: string, classNames: string[]) => {
  // const handler = (classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.remove(...classNames);
  }
};
export const useRemoveDomClass = useCurryTwo<[target: string], [classNames: string[]], void>(useRemoveDomClassShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type GetStyleName = keyof CSSStyleDeclaration & string;
/**
 * 获取dom的style各属性值
 * @param target
 * @param styleName 如：width
 * @returns
 */
const useGetDomStyleShallow = (target: string, styleName: GetStyleName): string[] => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  const styles = [];
  for (let i = 0; i <= targetDom.length - 1; i++) {
    /**dom.style只能获取到内联style的属性值，所以用这种方式获取 */
    styles.push(window.getComputedStyle(targetDom[i]).getPropertyValue(styleName));
  }
  return styles;
};
export const useGetDomStyle = useCurryTwo<[target: string], [styleName: GetStyleName], void>(useGetDomStyleShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type SetStyleName = keyof CSSStyleDeclaration;
/**
 * 设置dom的style各属性值
 * @param target
 * @param styleName 如：width
 * @param styleValue 如：12px
 */
export function useSetDomStyle(target: string): <T extends SetStyleName>(styleName: T) => (styleValue: CSSStyleDeclaration[T]) => void;
export function useSetDomStyle<T extends SetStyleName>(target: string, styleName: T): (styleValue: CSSStyleDeclaration[T]) => void;
export function useSetDomStyle<T extends SetStyleName>(target: string, styleName: T, styleValue: CSSStyleDeclaration[T]): void;
export function useSetDomStyle<T extends SetStyleName>(target: string, styleName?: T, styleValue?: CSSStyleDeclaration[T]) {
  const handler = (styleName: T) => {
    return (styleValue: CSSStyleDeclaration[T]) => {
      let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
      for (let i = 0; i <= targetDom.length - 1; i++) {
        targetDom[i].style[styleName] = styleValue;
      }
    };
  };
  /**Currying */
  if (styleName === undefined && styleValue === undefined) {
    return handler;
  } else if (styleValue === undefined && styleName !== undefined) {
    return handler(styleName);
  } else if (styleName !== undefined && styleValue !== undefined) {
    handler(styleName)(styleValue);
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
export const useSetDomScrollTop = useCurryTwo<[target: string], [scrollTop: number], void>(useSetDomScrollTopShallow);
