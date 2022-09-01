import { useConsoleWarn } from "../../../useInside";

/**
 * 点击复制
 * @param text 复制的文本
 */
export const useClipboard = async (text: string | number) => {
  if (!navigator.clipboard) {
    useConsoleWarn("useClipboard: 你的浏览器当前环境不支持复制!");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text.toString());
    return true;
  } catch (err) {
    useConsoleWarn(`useClipboard: ${err}`);
    return false;
  }
};
