import { useDeepEqual, useDeepClone } from ".";

type JoinArrayWithNoRepeatOptions<T> = {
  condition?: (item: T) => unknown;
  deep?: boolean; // 不考虑引用地址，进行值比较
  complete?: boolean; // 如果数组的对象存在map、set、NaN、undefined等，需要比较则要设为true
  pure?: boolean; // 默认在原数组上添加，true则会创建新的数组，数组的每一项也是新的
};

/**
 * 合并数组并去除重复值
 * @param targetArray 合并到的数组
 * @param referenceArr 被合并的数组
 * @param options 配置
 */
export function useJoinArrayWithNoRepeat<T>(targetArray: T[], referenceArr: T[], options: JoinArrayWithNoRepeatOptions<T>): T[];
export function useJoinArrayWithNoRepeat<T>(targetArray: T[], referenceArr: T[]): (options: JoinArrayWithNoRepeatOptions<T>) => T[];
export function useJoinArrayWithNoRepeat<T>(targetArray: T[], referenceArr: T[], options?: JoinArrayWithNoRepeatOptions<T>): T[] | ((options: JoinArrayWithNoRepeatOptions<T>) => T[]) {
  const handler = (options: JoinArrayWithNoRepeatOptions<T>) => {
    /**解构配置项 */
    const { condition, deep, complete, pure } = options;
    const _targetArray = pure ? useDeepClone(targetArray)({ complete }) : targetArray;
    for (let item of referenceArr) {
      let repeat = false;
      for (let i of _targetArray) {
        const referenceItem = condition ? condition(item) : item;
        const _targetItem = condition ? condition(i) : i;
        repeat = deep ? useDeepEqual(referenceItem, _targetItem)({ complete }) : referenceItem === _targetItem;
        if (repeat) break;
      }
      if (!repeat) {
        const _item = pure ? useDeepClone(item)({ complete }) : item;
        _targetArray.push(_item);
      }
    }
    return _targetArray;
  };
  /**Currying */
  if (options === undefined) {
    return handler;
  } else {
    return handler(options);
  }
}
