/**
 * 简化localStorage的使用
 * @param key
 * @param defaultValue 默认值
 * @returns
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

/**
 * @param key
 * @param value
 */
export const useSetLStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * @param key
 */
export const useRmLStorage = (key: string) => {
  localStorage.removeItem(key);
};
