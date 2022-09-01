/**
 * 检查是否都是简单数据类型, string number boolean symbol null undefined
 * @param argument
 */
export const useCheckSimpleData = (...argument: any[]) => {
  for (let item of argument) {
    /**如果过既不在["string", "number", "boolean", "symbol", "undefined"]里也不是null，则表示是引用类型，返回false*/
    if (!["string", "number", "boolean", "symbol", "undefined"].includes(typeof item) && item !== null) {
      return false;
    }
  }
  return true;
};
