import { useGenTimeStamp } from ".";
import { ObjectType } from "../../../type";
import { useCurryTwo } from "../../../util/currying";

/**
 * 时间戳毫秒或时间格式字符串转化为时间格式字符串
 * @param format 格式化格式,如："{YYYY}-{MM}-{dd} {hh}:{mm}:{ss}"
 * @param time 时间戳毫秒或时间格式字符串，如果是字符串要求从年开始
 */
const useTimeFormatShallow = (format: string, time: number | string) => {
  let newTime = useGenTimeStamp(time);
  const targetDate = new Date(newTime);
  const hours = targetDate.getHours();
  /**解析时间 */
  const date: ObjectType = {
    "M+": targetDate.getMonth() + 1,
    "d+": targetDate.getDate(),
    "H+": targetDate.getHours(),
    "h+": hours > 12 ? hours - 12 : hours,
    "m+": targetDate.getMinutes(),
    "s+": targetDate.getSeconds(),
    "q+": Math.floor((targetDate.getMonth() + 3) / 3),
    "S+": targetDate.getMilliseconds(),
  };
  const fullYear = targetDate.getFullYear();

  /**替换格式化字符串,年和其他分开替换 */
  if (/({y+})/i.test(format)) {
    const reg = /({y+})/i;
    const regRes = reg.exec(format) || [];
    const replaceValue = fullYear.toString().slice(6 - regRes[0].length);
    format = format.replace(regRes[0], replaceValue);
  }
  for (const key in date) {
    const reg = new RegExp("({" + key + "})");
    if (reg.test(format)) {
      const regRes = reg.exec(format) || [];
      const replaceValue = regRes[0].length === 3 ? date[key] : date[key].toString().padStart(2, "0");
      format = format.replace(regRes[0], replaceValue);
    }
  }
  return format;
};
export const useTimeFormat = useCurryTwo(useTimeFormatShallow);
