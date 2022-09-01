/**
 * 判断是否是app内置的浏览器
 * @returns
 */
export const useIsInApp = (): string | boolean => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("micromessenger")) {
    return "WX";
  } else if (ua.includes("qq")) {
    return "QQ";
  } else if (ua.includes("alipay")) {
    return "Alipay";
  }
  return false;
};
