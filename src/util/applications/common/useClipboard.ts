import ClipboardJS from "clipboard";

/**
 * 点击复制
 * @param text 复制的文本
 */
export const useClipboard = (text: string | number) => {
  const copyBtn = document.createElement("button");
  copyBtn.setAttribute("data-clipboard-text", text.toString());
  document.appendChild(copyBtn);

  return new Promise((resolve, reject) => {
    const clipboard = new ClipboardJS(copyBtn);
    clipboard.on("success", (e) => {
      resolve(e);
    });
    clipboard.on("error", (e) => {
      reject(e);
    });
    copyBtn.click;
    copyBtn.remove;
  });
};
