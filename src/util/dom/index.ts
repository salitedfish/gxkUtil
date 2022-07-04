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
  if (targetDom.length === 1) {
    return targetDom[0];
  } else {
    return targetDom;
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 添加目标dom的class
 * @param target id、class、tag需要带前缀#、.
 * @param classNames 类名数组
 * @returns
 */
export const useAddDomClass = (target: string, classNames: string[]) => {
  let targetDom: NodeListOf<HTMLElement> | HTMLElement = useGetDom(target);
  if (Array.isArray(targetDom)) {
    for (let item of targetDom) {
      item.classList.add(...classNames);
    }
  } else {
    (targetDom as HTMLElement).classList.add(...classNames);
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
  let targetDom: NodeListOf<HTMLElement> | HTMLElement = useGetDom(target);

  if (Array.isArray(targetDom)) {
    for (let item of targetDom) {
      item.classList.remove(...classNames);
    }
  } else {
    (targetDom as HTMLElement).classList.remove(...classNames);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 获取dom的style各属性值
 * @param target
 * @param styleName
 * @returns
 */
type GetStyleName = keyof CSSStyleDeclaration & string;
export const useGetDomStyle = (target: string, styleName: GetStyleName) => {
  let targetDom: NodeListOf<HTMLElement> | HTMLElement = useGetDom(target);
  if (Array.isArray(targetDom)) {
    return targetDom.map((item) => {
      return window.getComputedStyle(item).getPropertyValue(styleName);
    });
  } else {
    return window.getComputedStyle(targetDom as HTMLElement).getPropertyValue(styleName);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 设置dom的style各属性值
 * @param target
 * @param styleName
 * @param styleValue
 */
type SetStyleName = keyof CSSStyleDeclaration & string;
export const useSetDomStyle = <T extends SetStyleName>(target: string, styleName: T, styleValue: CSSStyleDeclaration[T]) => {
  let targetDom: NodeListOf<HTMLElement> | HTMLElement = useGetDom(target);
  if (Array.isArray(targetDom)) {
    for (let item of targetDom) {
      item.style[styleName] = styleValue;
    }
  } else {
    (targetDom as HTMLElement).style[styleName] = styleValue;
  }
};
