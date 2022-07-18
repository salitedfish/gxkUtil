import { useCurryTwo } from "src/util/currying";
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param defaultValue 默认值
 * @returns 返回自动处理后的值，对象、数组、字符串、布尔等
 */

const useGetLStorageShallow = (key: string, defaultValue: unknown) => {
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
export const useGetLStorage = useCurryTwo<[key: string], [defaultValue: unknown], unknown>(useGetLStorageShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param value 数组对象自动转化为json
 */
const useSetLStorageShallow = (key: string, value: unknown) => {
  const valueJSON = JSON.stringify(value);
  localStorage.setItem(key, valueJSON);
};
export const useSetLStorage = useCurryTwo<[key: string], [value: unknown], void>(useSetLStorageShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 */
export const useRemoveLStorage = (key: string) => {
  localStorage.removeItem(key);
};
