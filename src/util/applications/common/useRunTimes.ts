import { useCurryTwo } from "../../currying";

type RunTimesOptions = {
  times: number;
  interval?: number;
};
/**
 * 多次执行自定义的函数
 * @param callBack
 * @param options
 */
const useRunTimesShallow = (callBack: (times: number) => any, options: RunTimesOptions) => {
  let times = 0;
  if (!options.interval) {
    do {
      times++;
      callBack(times);
    } while (times < options.times);
  } else {
    const timer = setInterval(() => {
      times++;
      callBack(times);
      if (times >= options.times) {
        clearInterval(timer);
      }
    }, options.interval);
  }
};

export const useRunTimes = useCurryTwo(useRunTimesShallow);
