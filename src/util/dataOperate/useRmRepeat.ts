import { useDeepInclude, useDeepClone } from ".";

type RmRepeatOptions<V, W> = {
  deep?: boolean; // 是否不考虑引用地址,进行值去重
  pure?: boolean; // true则结果数据和原数据无关联，否则还存在引用关联
  condition?: (item: V) => W; // 依据的去重条件，没用则依据每一项
  complete?: boolean; // 只有当pure为true时才有效，判断通过递归方式、JSON方式进行深拷贝
};

/**
 * 数组去重，不改变原数组, 依赖useDeepInclude、useDeepClone
 * @param oldArr
 * @param options 是否深度去重，去重条件，是否纯净
 * @returns
 */
export function useRmRepeat<V, W>(oldArr: V[]): (options: RmRepeatOptions<V, W>) => V[];
export function useRmRepeat<V, W>(oldArr: V[], options: RmRepeatOptions<V, W>): V[];
export function useRmRepeat<V, W>(oldArr: V[], options?: RmRepeatOptions<V, W>): V[] | ((options: RmRepeatOptions<V, W>) => V[]) {
  const handler = (options: RmRepeatOptions<V, W>) => {
    /**解构配置项 */
    const { condition, deep, complete, pure } = options;
    const newArr: Array<V> = [];
    const referenceArr: Array<V | W> = [];
    for (const item of oldArr) {
      /**如果有condition则依据处理后的值来判断 */
      /**deep为true则用useDeepInclude判断是否重复，否则用includes判断是否重复 */
      const referenceItem = condition ? condition(item) : item;
      const repeat = deep ? useDeepInclude(referenceArr, { condition: referenceItem }) !== false : referenceArr.includes(referenceItem);
      if (!repeat) {
        /**pure为true则，新数组的每一项完全和旧数组没联系
         * 这里只有不是重复时才进行纯净判断，优化性能
         */
        const resItem = pure ? useDeepClone(item)({ complete }) : item;
        newArr.push(resItem);
        referenceArr.push(referenceItem);
      }
    }
    return newArr;
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
