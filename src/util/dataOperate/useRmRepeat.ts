import { useDeepInclude } from ".";
/**
 * 数组去重，不改变原数组, 依赖useDeepInclude
 * @param oldArr
 * @param deep 是否深度去重，默认false
 * @returns
 */
export function useRmRepeat<V>(oldArr: V[]): (deep: boolean) => V[];
export function useRmRepeat<V>(oldArr: V[], deep: boolean): V[];
export function useRmRepeat<V>(oldArr: V[], deep?: boolean): V[] | ((deep: boolean) => V[]) {
  const handler = (deep: boolean) => {
    const newArr: V[] = [];
    for (const item of oldArr) {
      /**deep为true则用useDeepInclude判断是否重复，否则用includes判断是否重复 */
      const repeat = deep ? useDeepInclude(newArr, item) !== false : newArr.includes(item);
      if (!repeat) {
        newArr.push(item);
      }
    }
    return newArr;
  };
  /**Currying */
  if (deep === undefined) {
    return handler;
  } else {
    return handler(deep);
  }
}
