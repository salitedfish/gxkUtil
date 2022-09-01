import { useCurryTwo } from "../../../util/currying";

/**
 * 简化localStorage的使用
 * @param key
 * @param value 数组对象自动转化为json
 */
const useSetLStorageShallow = (key: string, value: unknown) => {
  const valueJSON = JSON.stringify(value);
  localStorage.setItem(key, valueJSON);
};
export const useSetLStorage = useCurryTwo(useSetLStorageShallow);
