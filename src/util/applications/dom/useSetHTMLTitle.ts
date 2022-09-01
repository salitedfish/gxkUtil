/**
 * 设置页面的title
 * @param title
 */
export const useSetHTMLTitle = (title: string): void => {
  const titleDom = window.document.getElementsByTagName("title")[0];
  titleDom.innerText = title;
};
