import { UseDebounce, UseThrottling, UseTimesClick, UsePromiseQueue } from "../type";

/**
 * 检查参数中是否有undefined
 * @param argument
 * @returns
 */
export const useCheckUndefined = (...argument: any[]): boolean => {
  return argument.includes(undefined);
};

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
 * @param options count countDown 最大请求次数 请求返回后间隔多少时间请求一次
 * @returns
 */
export const usePromiseQueue: UsePromiseQueue = (asyncCallBack, isCondition, params, options) => {
  const resOptions = { count: 3, countDown: 500, ...options };
  let count = 0;
  return new Promise((resolve, reject) => {
    const handler = async () => {
      count = count + 1;
      try {
        const result = await asyncCallBack(params);
        if (isCondition(result)) {
          /**满足条件返回 */
          resolve(result);
        } else if (count > resOptions.count) {
          /**超出最大次数返回reject */
          reject("Exceeded times");
        } else {
          /**否则继续请求 */
          setTimeout(handler, resOptions.countDown);
        }
      } catch (error) {
        reject(error);
      }
    };
    setTimeout(handler, resOptions.countDown);
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
export const useDeepClone = <T>(oldData: T): T => {
  if (useCheckUndefined(oldData)) {
    throw new Error("oldData is undefined");
  }
  if (oldData === null) {
    return oldData;
  } else if (Array.isArray(oldData)) {
    const newData: any = [];
    for (const item of oldData) {
      newData.push(useDeepClone(item));
    }
    return newData;
  } else if (typeof oldData === "object") {
    const newData: any = {};
    for (const key in oldData) {
      newData[key] = useDeepClone(oldData[key]);
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
 * 组装url参数
 * @param url
 * @param params
 * @returns
 */
export const useGenParamsUrl = (url: string, params: { [key: string]: string | number } = {}): string => {
  if (useCheckUndefined(url, params)) {
    throw new Error("url or params is undefined");
  }
  let resUrl: string;
  if (url[url.length - 1] === "?") {
    resUrl = url;
  } else {
    resUrl = url + "?";
  }
  if (params) {
    for (const key in params) {
      url = `${url}${key}=${params[key]}&`;
    }
  }
  return resUrl.slice(0, url.length - 1);
};

/**
 * 深度比较两个数据是否相同
 * @param origin 例如: {a: 1}
 * @param target 例如: {a: 1}
 * @returns
 */
export const useDeepCompare = (origin: any, target: any): boolean => {
  if (["string", "number"].includes(typeof origin) || ["string", "number"].includes(typeof target) || [origin, target].includes(null)) {
    return origin === target;
  } else {
    /**false优先，只要有不同就return false */
    if (Array.isArray(origin) && Array.isArray(target)) {
      if (origin.length !== target.length) {
        return false;
      } else {
        for (let i = 0; i < origin.length; i++) {
          if (!useDeepCompare(origin[i], target[i])) {
            return false;
          }
        }
        return true;
      }
    } else if (typeof origin === "object" && typeof target === "object") {
      for (const key in origin) {
        if (!useDeepCompare(origin[key], target[key])) {
          return false;
        }
      }
      return true;
    } else {
      return origin === target;
    }
  }
};

/**
 * 深度判断数组中是否包含某个值
 * @param origin 例如[{a:1}]
 * @param target 例如 {a:1}
 * @returns
 */
export const useDeepInclude = (origin: unknown[], target: unknown): boolean | number => {
  if (useCheckUndefined(origin, target)) {
    throw new Error("origin or target is undefined");
  }
  if (["string", "number"].includes(typeof target) || target === null) {
    return origin.includes(target);
  } else {
    for (const item of origin) {
      if (useDeepCompare(item, target)) {
        return true;
      }
    }
    return false;
  }
};

/**
 * 深度数组去重，不改变原数组
 * @param oldArr
 * @returns
 */
export const useDeepRmDuplication = <V>(oldArr: V[]): V[] => {
  const newArr: V[] = [];
  for (const item of oldArr) {
    if (!useDeepInclude(newArr, item)) {
      newArr.push(item);
    }
  }
  return newArr;
};
