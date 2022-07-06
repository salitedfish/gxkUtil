/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param defaultValue 默认值
 * @returns 返回自动处理后的值，对象、数组、字符串、布尔等
 */
export const useGetLStorage = (key: string, defaultValue: any = undefined) => {
  let value = localStorage.getItem(key);
  if (!value) {
    return defaultValue;
  }
  try {
    value = JSON.parse(value);
    return value;
  } catch (err) {
    return value;
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param value 数组对象自动转化为json
 */
export const useSetLStorage = (key: string, value: any) => {
  const valueJSON = JSON.stringify(value);
  localStorage.setItem(key, valueJSON);
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 */
export const useRemoveLStorage = (key: string) => {
  localStorage.removeItem(key);
};
