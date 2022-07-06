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
  return targetDom;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 添加目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
export const useAddDomClass = (target: string, classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.add(...classNames);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 移除目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
export const useRemoveDomClass = (target: string, classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.remove(...classNames);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 获取dom的style各属性值
 * @param target
 * @param styleName 如：width
 * @returns
 */
type GetStyleName = keyof CSSStyleDeclaration & string;
export const useGetDomStyle = (target: string, styleName: GetStyleName) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  const styles = [];
  for (let i = 0; i <= targetDom.length - 1; i++) {
    /**dom.style只能获取到内联style的属性值，所以用这种方式获取 */
    styles.push(window.getComputedStyle(targetDom[i]).getPropertyValue(styleName));
  }
  return styles;
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 设置dom的style各属性值
 * @param target
 * @param styleName 如：width
 * @param styleValue 如：12px
 */
type SetStyleName = keyof CSSStyleDeclaration & string;
export const useSetDomStyle = <T extends SetStyleName>(target: string, styleName: T, styleValue: CSSStyleDeclaration[T]) => {
  let targetDom: NodeListOf<HTMLElement> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].style[styleName] = styleValue;
  }
};
