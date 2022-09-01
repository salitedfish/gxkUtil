import { useGetDom } from ".";

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
