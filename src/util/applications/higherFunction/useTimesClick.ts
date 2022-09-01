type UseTimesClick = <V extends any[], R>(callBack: (...params: V) => R, option?: { times?: number; countDown?: number; interval?: number }) => (...params: V) => R | void;
/**
 * 多次点击Hook，支持节流
 * @param callBack
 * @param option 可选参数times默认两次，countDown持续300ms, interval间隔300秒
 * @returns
 */
export const useTimesClick: UseTimesClick = (callBack, option) => {
  let times = 0;
  let lock = false;
  let timer: NodeJS.Timeout;
  /**重置状态 */
  const reset = () => {
    times = 0;
    clearTimeout(timer);
    lock = false;
  };
  let _option = {
    ...{
      times: 2,
      countDown: 300,
      interval: 300,
    },
    ...option,
  };
  return (...params) => {
    if (!lock) {
      /**第一次点击，设置持续一段时间后重置状态 */
      if (!timer) {
        timer = setTimeout(() => {
          reset();
        }, _option.countDown);
      }
      times = times + 1;
      /**当点击次数等于设置的次数时，执行目标函数，并关锁。间隔一段时间后重置状态*/
      if (times === _option.times) {
        lock = true;
        setTimeout(() => {
          reset();
        }, _option.interval);
        return callBack(...params);
      }
    }
  };
};
