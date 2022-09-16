import { useConsoleWarn } from "../../../useInside";

/**
 * 将图片的二进制数据转化为浏览器中的URL
 * @param binary
 * @returns
 */
export const useBinaryToURL = (binary: Blob | ArrayBuffer) => {
  if (!window?.URL?.createObjectURL) {
    useConsoleWarn("useBinaryToURL: 当前环境不可用");
    return;
  }
  if (binary instanceof ArrayBuffer) {
    return window.URL.createObjectURL(new Blob([binary]));
  } else if (binary instanceof Blob) {
    return window.URL.createObjectURL(binary);
  } else {
    useConsoleWarn("useBinaryToURL: 数据格式不正确");
    return;
  }
};
