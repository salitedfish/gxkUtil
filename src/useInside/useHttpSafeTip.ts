/**
 * 浏览器出于安全考虑，有些操作http环境下需要对应操作才行
 */
export const useHttpSafeTip = () => {
  console.log(`
    http环境则需要如下操作：
    chrome浏览器输入：", "chrome://flags/#unsafely-treat-insecure-origin-as-secure
    edge浏览器输入：", "edge://flags/#unsafely-treat-insecure-origin-as-secure
    `);
};
