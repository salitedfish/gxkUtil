type Position = "left" | "center" | "right" | "between";
/**
 * 根据提供的位置替换字符串
 * @param target
 * @param position
 * @param count 如果是两个值,第二个值表示从后面开始计数
 * @param replaceStr default: "*"
 */
export function useRepPartStr(target: string, position: "center" | "between", count: [number, number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: "left" | "right", count: [number], replaceStr?: string): string;
export function useRepPartStr(target: string, position: Position, count: number[], replaceStr: string = "*"): string {
  if (["left", "right"].includes(position)) {
    /**二段 */
    const preStr = target.slice(0, count[0]);
    const nextStr = target.slice(count[0]);
    if (position === "left") {
      return preStr.replace(/./g, replaceStr) + nextStr;
    } else if (position === "right") {
      return preStr + nextStr.replace(/./g, replaceStr);
    }
  } else if (["center", "between"].includes(position)) {
    /**三段 */
    const preStr = target.slice(0, count[0]);
    const centerStr = target.slice(count[0], -count[1]);
    const nextStr = target.slice(-count[1]);
    if (position === "center") {
      return preStr + centerStr.replace(/./g, replaceStr) + nextStr;
    } else if (position === "between") {
      return preStr.replace(/./g, replaceStr) + centerStr + nextStr.replace(/./g, replaceStr);
    }
  }
  return target;
}
