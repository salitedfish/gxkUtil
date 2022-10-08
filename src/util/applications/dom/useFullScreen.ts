import { useGetDom } from "./useGetDom";

/**
 * 关闭全屏
 */
const useExitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  }
};
/**
 * 开启全屏
 * @param target
 * @returns 成功返回关闭全屏函数，否则返回false
 */
export const useFullScreen = (target: string | HTMLElement) => {
  const targetDom: any = typeof target === "string" ? useGetDom(target)[0] : target;
  if (targetDom.requestFullscreen) {
    targetDom.requestFullscreen();
    return useExitFullscreen;
  } else if (targetDom.mozRequestFullScreen) {
    targetDom.mozRequestFullScreen();
    return useExitFullscreen;
  } else if (targetDom.msRequestFullscreen) {
    targetDom.msRequestFullscreen();
    return useExitFullscreen;
  } else if (targetDom.webkitRequestFullscreen) {
    targetDom.webkitRequestFullScreen();
    return useExitFullscreen;
  } else {
    return false;
  }
};
