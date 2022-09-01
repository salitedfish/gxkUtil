import { useCurryTwo } from "../../../util/currying";
import { ObjectType } from "../../../type";

/**
 * 剩余时间毫秒转化为时间格式字符串
 * @format 格式化格式，如："{dd}天{hh}时{mm}分{ss}秒"
 * @param time 剩余时间毫秒
 */
const useCountDownFormatShallow = (format: string, time: number | string) => {
  let newTime = Number(time);
  /**解析时间 */
  const date: ObjectType<number> = {
    "d+": Math.floor(newTime / 1000 / 3600 / 24),
    "h+": Math.floor((newTime % (1000 * 3600 * 24)) / 1000 / 3600),
    "m+": Math.floor((newTime % (1000 * 60 * 60)) / 1000 / 60),
    "s+": Math.floor((newTime % (1000 * 60)) / 1000),
  };
  /**替换格式化字符串 */
  for (const key in date) {
    const reg = new RegExp("({" + key + "})");
    if (reg.test(format)) {
      const regRes = reg.exec(format) || [];
      const replaceValue = regRes[0].length === 3 ? date[key] : date[key].toString().padStart(2, "0");
      format = format.replace(regRes[0], String(replaceValue));
    }
  }
  return format;
};
export const useCountDownFormat = useCurryTwo(useCountDownFormatShallow);
