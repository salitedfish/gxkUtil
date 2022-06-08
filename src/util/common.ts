import { UseDebounce, UseThrottling, UseTimesClick, UsePromiseQueue } from "../type";
/**
 * 防抖Hook
 * @param callBack
 * @param countDown
 * @returns
 */
export const useDebounce: UseDebounce = (callBack, countDown = 1000) => {
  let timer: NodeJS.Timeout;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callBack(...params);
      clearTimeout(timer);
    }, countDown);
  };
};
/**
 * 节流Hook
 * @param callBack
 * @param countDown
 * @returns
 */
export const useThrottling: UseThrottling = (callBack, countDown = 1000) => {
  let lock = false;
  return (...params) => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        callBack(...params);
        lock = false;
      }, countDown);
    }
  };
};
/**
 * 多次点击Hook,支持节流
 * @param callBack
 * @param option 可选参数times默认两次，持续500ms,间隔0秒
 * @returns
 */
export const useTimesClick: UseTimesClick = (callBack, option) => {
  let times = 0;
  let lock = false;
  let timer: NodeJS.Timeout;
  let op = {
    ...{
      times: 2,
      countDown: 500,
      interval: 0,
    },
    ...option,
  };
  return (...params) => {
    if (!lock) {
      if (!timer) {
        timer = setTimeout(() => {
          times = 0;
          clearTimeout(timer);
        }, op.countDown);
      }
      times = times + 1;
      if (times === op.times) {
        callBack(...params);
        lock = true;
        setTimeout(() => {
          lock = false;
        }, op.interval);
      }
    }
  };
};
/**
 * promise返回结果后，如果成功则返回，否则继续请求,直到最终满足条件
 * @param asyncCallBack
 * @param params
 * @param isCondition 判断是否满足条件的函数，返回true表示满足
 * @param countDown 请求返回后间隔多少时间请求一次
 * @returns
 */
export const usePromiseQueue: UsePromiseQueue = (asyncCallBack, isCondition, params, countDown = 500) => {
  return new Promise((resolve) => {
    const handler = async () => {
      try {
        const result = await asyncCallBack(params);
        if (isCondition(result)) {
          resolve(result);
        } else {
          setTimeout(handler, countDown);
        }
      } catch (error) {
        throw Error(error as any);
      }
    };
    setTimeout(handler, countDown);
  });
};
/**
 * 从URL中获取文件名、文件名.扩展名
 * @param URL
 * @param withExt true表示携带扩展名
 * @returns
 */
export const useFileNameFromURL = (URL: string, withExt = false) => {
  const firstIndex = URL.lastIndexOf("/") + 1;
  const lastIndex = URL.lastIndexOf(".");
  if (withExt) {
    return URL.slice(firstIndex);
  } else {
    return URL.slice(firstIndex, lastIndex);
  }
};
/**
 * 深拷贝,这里函数不考虑，map、set等没考虑到
 * @param oldData
 * @returns
 */
export const useDeepCopy = <T>(oldData: T): T => {
  if (Array.isArray(oldData)) {
    const newData: any = [];
    for (const item of oldData) {
      newData.push(useDeepCopy(item));
    }
    return newData;
  } else if (typeof oldData === "object") {
    const newData: any = {};
    for (const key in oldData) {
      newData[key] = useDeepCopy(oldData[key]);
    }
    return newData;
  } else {
    const newData = oldData;
    return newData;
  }
};
/**
 * 通过文件地址点击下载
 * @param url
 * @param name
 */
export const useDownloadByURL = (url: string, name = "file") => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};
/**
 * 简单数组去重
 * @param array number | string
 * @returns
 */
export const useRemoveDuplication = <V extends number | string>(array: V[]): V[] => {
  return Array.from(new Set(array));
};
