import { useGetDom } from ".";

/**
 * 判断目标dom是否在屏幕视野内
 * @param target
 * @returns boolean
 */
export const useDomOnVisibleArea = (target: string) => {
  let targetDom: HTMLElement | undefined = useGetDom(target)[0];
  if (!targetDom) {
    return false;
  } else {
    /**获取目标距离屏幕上方和左边的距离 */
    const targetOffsetClientTop = targetDom.getBoundingClientRect().top;
    const targetOffsetClientLeft = targetDom.getBoundingClientRect().left;
    /**获取目标的高度和宽度 */
    const targetHeight = targetDom.offsetHeight;
    const targetWidth = targetDom.offsetWidth;
    /**获取屏幕内容的高度和宽度 */
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    if (targetOffsetClientTop + targetHeight > 0 && targetOffsetClientTop < screenHeight && targetOffsetClientLeft + targetWidth > 0 && targetOffsetClientLeft < screenWidth) {
      return true;
    } else {
      return false;
    }
  }
};
