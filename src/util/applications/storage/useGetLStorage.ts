import { useCurryTwo } from "../../../util/currying";

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
export const useGetLStorage = useCurryTwo(useGetLStorageShallow);
