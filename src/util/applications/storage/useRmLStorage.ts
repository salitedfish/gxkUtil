/**
 * 简化localStorage的使用
 * @param key
 */
export const useRmLStorage = (key: string) => {
  localStorage.removeItem(key);
};
