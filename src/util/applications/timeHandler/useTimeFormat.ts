import type { ObjectType } from "../../../type";
import { useGenTimeStamp } from ".";
import { useCurryTwo } from "../../../util/currying";

export const seasonMap = [
  { zh: "一", zhText: "春", en: "Spring", num: 1 },
  { zh: "二", zhText: "夏", en: "Summer", num: 2 },
  { zh: "三", zhText: "秋", en: "Autumn", num: 3 },
  { zh: "四", zhText: "冬", en: "Winter", num: 4 },
];

export const monthMap = [
  { zh: "一", en: "January", num: 1 },
  { zh: "二", en: "February", num: 2 },
  { zh: "三", en: "March", num: 3 },
  { zh: "四", en: "April", num: 4 },
  { zh: "五", en: "May", num: 5 },
  { zh: "六", en: "June", num: 6 },
  { zh: "七", en: "July", num: 7 },
  { zh: "八", en: "Augus", num: 8 },
  { zh: "九", en: "September", num: 9 },
  { zh: "十", en: "October", num: 10 },
  { zh: "十一", en: "November", num: 11 },
  { zh: "十二", en: "December", num: 12 },
];

export const weekMap = [
  { zh: "天", en: "Sunday", num: 0 },
  { zh: "一", en: "Monday", num: 1 },
  { zh: "二", en: "Tuesday", num: 2 },
  { zh: "三", en: "Wednesday", num: 3 },
  { zh: "四", en: "Thursday", num: 4 },
  { zh: "五", en: "Friday", num: 5 },
  { zh: "六", en: "Saturday", num: 6 },
];

/**
 * 时间戳毫秒或时间格式字符串转化为时间格式字符串
 * @param format 格式化格式,如："{YYYY}-{MM}-{dd} {hh}:{mm}:{ss}"
 * @param time 时间戳毫秒或时间格式字符串，如果是字符串要求从年开始
 */
const useTimeFormatShallow = (format: string, time: number | string) => {
  let newTime = useGenTimeStamp(time);
  const targetDate = new Date(newTime);
  const season = seasonMap[Math.floor((targetDate.getMonth() + 3) / 3) - 1];
  const month = monthMap[targetDate.getMonth()];
  const week = weekMap[targetDate.getDay()];
  const hour = targetDate.getHours();

  /**解析时间 */
  const date: ObjectType = {
    "q+": season.zh,
    "M+": month.num,
    "w+": week.zh,
    "d+": targetDate.getDate(),
    "H+": hour,
    "h+": hour > 12 ? hour - 12 : hour,
    "m+": targetDate.getMinutes(),
    "s+": targetDate.getSeconds(),
    "S+": targetDate.getMilliseconds(),
  };
  const fullYear = targetDate.getFullYear();

  /**替换格式化字符串,年和其他分开替换 */
  if (/({y+})/i.test(format)) {
    const reg = /({y+})/i;
    const regRes = reg.exec(format) || [""];
    const replaceValue = fullYear.toString().slice(6 - regRes[0].length);
    format = format.replace(regRes[0], replaceValue);
  }
  for (const key in date) {
    const reg = new RegExp("({" + key + "})");
    if (reg.test(format)) {
      const regRes = reg.exec(format) || [""];
      const replaceValue = regRes[0].length === 3 ? date[key] : date[key].toString().padStart(2, "0");
      format = format.replace(regRes[0], replaceValue);
    }
  }

  /**返回格式化的字符串和各个数据 */
  return {
    format,
    year: fullYear,
    season,
    month,
    week,
    day: date["d+"],
    hour,
    minute: date["m+"],
    second: date["s+"],
  };
};
export const useTimeFormat = useCurryTwo(useTimeFormatShallow);
