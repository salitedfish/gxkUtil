import { useConsoleError } from "../../../useInside";

/**
 * 将时间格式字符串或时间戳字符串转化为时间戳毫秒
 * @param timeStr 如：2010年1月1号 10时2分4或1234567891
 */
export const useGenTimeStamp = (timeStr: string | number): number => {
  if (isNaN(Number(timeStr))) {
    /**如果是"2010年1月1号 10时2分4 */
    const timeStrFormat = String(timeStr)
      .replace(/-|年|月|日|号/g, "/")
      .replace(/时|分|秒/g, ":");
    const timeStamp = Number(new Date(timeStrFormat));
    if (isNaN(timeStamp)) {
      useConsoleError("useGenTimeStamp: 时间格式错误!");
    }
    return timeStamp;
  } else {
    /**如果是"1234567891000"或1234567891000*/
    return Number(timeStr);
  }
};
