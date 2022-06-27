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
  let targetDom: NodeListOf<Element> = document.querySelectorAll(target);
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
  let targetDom: NodeListOf<Element> = useGetDom(target);
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
  let targetDom: NodeListOf<Element> = useGetDom(target);
  for (let i = 0; i <= targetDom.length - 1; i++) {
    targetDom[i].classList.remove(...classNames);
  }
};
