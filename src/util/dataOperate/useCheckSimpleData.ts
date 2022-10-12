/**
 * 检查是否都是简单数据(这里把null也看做简单数据), string number boolean symbol null undefined
 * @param argument
 */
export const useCheckSimpleData = (...argument: any[]) => {
  for (let item of argument) {
    const isEasy = ["string", "number", "boolean", "symbol", "undefined"].includes(typeof item) || [null].includes(item);
    /**如果类型不在["string", "number", "boolean", "symbol", "undefined"]里，且值不在[null]里，则表示是引用数据，返回false*/
    if (!isEasy) {
      return false;
    }
  }
  return true;
};
