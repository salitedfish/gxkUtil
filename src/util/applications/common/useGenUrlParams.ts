/**
 * 将url地址中的参数字符串解析成对象的形式
 * @param url
 * @returns
 */
export const useGenUrlParams = (url: string): Obj => {
  const paramsStr = url.split("?")[1];
  if (paramsStr) {
    const paramsObj: Obj = {};
    const paramsArr = paramsStr.split("&");
    for (const item of paramsArr) {
      const [key, value] = item.split("=");
      paramsObj[key] = value;
    }
    return paramsObj;
  } else {
    return {};
  }
};
