/**
 * 检查是否都是简单数据(这里把null也看做简单数据), string number boolean symbol null undefined
 * @param argument
 */
export const useCheckSimpleData = (...argument: any[]) => {
  for (let item of argument) {
    /**如果过既不在["string", "number", "boolean", "symbol", "undefined"]里也不是null，则表示是引用数据，返回false*/
    if (!["string", "number", "boolean", "symbol", "undefined"].includes(typeof item) && item !== null) {
      return false;
    }
  }
  return true;
};
