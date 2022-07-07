/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param defaultValue 默认值
 * @returns 返回自动处理后的值，对象、数组、字符串、布尔等
 */
export function useGetLStorage(key: string): (defaultValue?: unknown) => unknown;
export function useGetLStorage(key: string, defaultValue: unknown): unknown;
export function useGetLStorage(key: string, defaultValue?: unknown) {
  const handler = (defaultValue: unknown = undefined) => {
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
  if (defaultValue) {
    return handler(defaultValue);
  } else {
    return useGetLStorage;
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 * @param value 数组对象自动转化为json
 */
export function useSetLStorage(key: string): (value: unknown) => void;
export function useSetLStorage(key: string, value: unknown): void;
export function useSetLStorage(key: string, value?: unknown) {
  const handler = (value: unknown) => {
    const valueJSON = JSON.stringify(value);
    localStorage.setItem(key, valueJSON);
  };
  if (value) {
    return handler(value);
  } else {
    return handler;
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 简化localStorage的使用
 * @param key
 */
export const useRemoveLStorage = (key: string) => {
  localStorage.removeItem(key);
};
