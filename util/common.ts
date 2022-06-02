import { UseDebounce, UseThrottling, UseTimesClick, UsePromiseQueue } from "../type";

/**
 * 防抖Hook
 * @param callBack
 * @param countDown
 * @returns
 */
export const useDebounce: UseDebounce = (callBack, countDown = 1000) => {
  let timer: number | undefined = undefined;
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
 * @param times
 * @param countDown
 * @returns
 */
export const useTimesClick: UseTimesClick = (callBack, times = 2, countDown = 500, interval = 0) => {
  let t = 0;
  let lock = false;
  let timer: number | undefined = undefined;
  return (...params) => {
    if (!lock) {
      if (!timer) {
        timer = setTimeout(() => {
          t = 0;
          clearTimeout(timer);
        }, countDown);
      }
      t = t + 1;
      if (t === times) {
        callBack(...params);
        lock = true;
        setTimeout(() => {
          lock = false;
        }, interval);
      }
    }
  };
};

/**
 * promise返回结果后，如果成功则返回，否则继续请求,直到最终满足条件
 * @param asyncCallBack
 * @param params
 * @param isCondition
 * @param countDown
 * @returns
 */
export const usePromiseQueue: UsePromiseQueue<{
  code: number;
  data: unknown;
  message: string;
}> = (asyncCallBack, params, isCondition, countDown) => {
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
 * @param withExt
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
export const useDeepCopy = <T extends any>(oldData: T): T => {
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
  link.download = name;
  link.style.display = "none";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};

/**
 * 判断是否是移动端或移动端的界面大小
 * @returns
 */
export const useIsMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  let width = document.documentElement.clientWidth;
  return !!(flag || width <= 500);
};
