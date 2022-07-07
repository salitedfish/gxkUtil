import { useCheckUndefined } from "../../dataOperate";
import SparkMD5 from "spark-md5";
import sha256 from "crypto-js/sha256";
import Clipboard from "clipboard";
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 从URL中获取文件名、文件名.扩展名
 * @param URL
 * @param withExt true表示携带扩展名
 * @returns
 */
export const useFileNameFromURL = (URL: string, withExt: boolean = false) => {
  const firstIndex = URL.lastIndexOf("/") + 1;
  const lastIndex = URL.lastIndexOf(".");
  if (withExt) {
    return URL.slice(firstIndex);
  } else {
    return URL.slice(firstIndex, lastIndex);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 从URL中获取文件类型
 * @param URL
 * @param format 默认为false，false则直接返回扩展名，true为格式化为image，video等
 * @returns
 */
export const useFileTypeFromURL = (URL: string, format: boolean = false) => {
  const fileType = URL.slice(URL.lastIndexOf(".") + 1);
  if (!format) {
    return fileType;
  }
  const imgType = ["png", "jpg", "jpeg", "gif"];
  const videoType = ["wmv", "asf", "asx", "rm", "rmvb", "mpg", "mpeg", "mp4", "3gp", "mov", "m4v", "avi", "mkv", "flv", "vob"];
  const audioType = ["mp3", "wma", "wav", "amr", "m4a"];
  const pptType = ["ppt", "pptx"];
  const wordType = ["doc", "docx"];
  const excelType = ["xls", "xlsx"];
  const pdfType = ["pdf"];
  const txtType = ["txt"];

  if (imgType.includes(fileType)) {
    return "image";
  } else if (videoType.includes(fileType)) {
    return "video";
  } else if (audioType.includes(fileType)) {
    return "audio";
  } else if (pptType.includes(fileType)) {
    return "ppt";
  } else if (wordType.includes(fileType)) {
    return "word";
  } else if (excelType.includes(fileType)) {
    return "excel";
  } else if (pdfType.includes(fileType)) {
    return "pdf";
  } else if (txtType.includes(fileType)) {
    return "txt";
  }
  return "other";
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 组装url参数
 * @param url
 * @param params
 * @returns
 */
export function useGenParamsUrl(url: string): (params?: { [key: string]: string | number }) => string;
export function useGenParamsUrl(url: string, params: { [key: string]: string | number }): string;
export function useGenParamsUrl(url: string, params?: { [key: string]: string | number } | undefined) {
  const handler = (params: { [key: string]: string | number } | undefined = {}) => {
    let resUrl: string;
    if (url[url.length - 1] === "?") {
      resUrl = url;
    } else {
      resUrl = url + "?";
    }
    if (params) {
      for (const key in params) {
        resUrl = `${resUrl}${key}=${params[key]}&`;
      }
    }
    return resUrl.slice(0, resUrl.length - 1);
  };
  if (params) {
    return handler(params);
  } else {
    return handler;
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UseDebounce = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 防抖Hook
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useDebounce: UseDebounce = (callBack, countDown = 1000) => {
  let timer: NodeJS.Timeout;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      return callBack(...params);
    }, countDown);
  };
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UseThrottling = <V extends any[], R>(callBack: (...params: V) => R, countDown?: number) => (...params: V) => R | void;
/**
 * 节流Hook
 * @param callBack
 * @param countDown 默认为1000
 * @returns
 */
export const useThrottling: UseThrottling = (callBack, countDown = 1000) => {
  let lock = false;
  return (...params) => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        lock = false;
        return callBack(...params);
      }, countDown);
    }
  };
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UseTimesClick = <V extends any[], R>(callBack: (...params: V) => R, option?: { times?: number; countDown?: number; interval?: number }) => (...params: V) => R | void;
/**
 * 多次点击Hook,支持节流
 * @param callBack
 * @param option 可选参数times默认两次，countDown持续500ms, interval间隔0秒
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
        lock = true;
        setTimeout(() => {
          lock = false;
        }, op.interval);
        return callBack(...params);
      }
    }
  };
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 点击复制
 * @param text 复制的文字
 * @param domID 为了规范，统一传入dom的id, 默认为app
 * @param options 失败与成功后的回调
 */
export const useClipboard = (
  text: string,
  options:
    | {
        domID: string;
        success?: () => void;
        fail?: () => void;
      }
    | undefined = {
    domID: "app",
  }
) => {
  if (useCheckUndefined(text)) {
    return;
  }
  let clipboard = new Clipboard(`#${options.domID}`, {
    text: function () {
      return text;
    },
  });
  clipboard.on("success", (e) => {
    options?.success ? options.success() : null;
    e.clearSelection();
  });
  clipboard.on("error", () => {
    options?.fail ? options.fail() : null;
  });
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type UsePromiseInsist = <V extends any[], T>(asyncCallBack: (...params: V) => Promise<T>, isCondition?: (params: T) => boolean, options?: { count?: number; countDown?: number }) => (...params: V) => Promise<T>;
/**
 * promise返回结果后，如果满足条件则返回，否则继续执行，直到最终满足条件或达到最大次数
 * @param asyncCallBack
 * @param isCondition 判断是否满足条件的函数，返回true表示满足, 默认返回有值则满足条件
 * @param options count 最大请求次数，默认3， countDown 请求返回后间隔多少时间请求一次，默认500
 * @returns 返回一个直到结果为true才返回promise的函数
 */
export const usePromiseInsist: UsePromiseInsist = (asyncCallBack, isCondition = (res) => !!res, options = {}) => {
  const resOptions = { count: 3, countDown: 500, ...options };
  let count = 0;
  return (...params) => {
    return new Promise((resolve, reject) => {
      const handler = async () => {
        count = count + 1;
        try {
          const result = await asyncCallBack(...params);
          if (isCondition(result)) {
            /**满足条件返回 */
            resolve(result);
          } else if (count > resOptions.count) {
            /**超出最大次数返回reject */
            reject("Exceeded times");
          } else {
            /**否则继续执行 */
            setTimeout(handler, resOptions.countDown);
          }
        } catch (error) {
          reject(error);
        }
      };
      setTimeout(handler, resOptions.countDown);
    });
  };
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// type UseAsync = <T extends any[], V>(asyncCallBack: (...params: T) => Promise<V | void>) => (...params: T) => <U>(defaultValue: U, errCallBack?: (err: unknown) => void) => Promise<V | U>;
// /**
//  * 旨在对async 和 await的封装，可以传入当异步没返回值或异步出错时的默认返回值和异常回调函数
//  * @param asyncCallBack
//  * @returns
//  */
// export const useAsync: UseAsync = (asyncCallBack) => {
//   return (...params) => {
//     return async (defaultValue, errCallBack) => {
//       try {
//         const res = await asyncCallBack(...params);
//         if (res) {
//           return res;
//         } else {
//           errCallBack ? errCallBack(res) : null;
//           return Promise.reject(defaultValue);
//         }
//       } catch (err) {
//         errCallBack ? errCallBack(err) : null;
//         return Promise.reject(defaultValue);
//       }
//     };
//   };
// };
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 计算文件或字符串MD5hash
 * @param data
 * @returns
 * md5加密安全性没sha256高，但是速度快点，这里文件加密用md5
 */
export const useGenMD5Hash = async (data: File | string) => {
  if (typeof data == "string") {
    return SparkMD5.hash(data);
  } else {
    //将文件读取成buffer数组
    const dataBufferArr = await data.arrayBuffer();
    //如果文件文件大于1m，则需要分块
    let chunkSize = 104857600;
    let chunks = Math.ceil(data.size / chunkSize);
    let currentChunk = 0;
    let spark = new SparkMD5.ArrayBuffer();
    //循环将每块文件块计算hash
    while (currentChunk < chunks) {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= data.size ? data.size : start + chunkSize;
      spark.append(Buffer.from(dataBufferArr).slice(start, end));
      currentChunk++;
    }
    return spark.end();
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 计算字符串sha256hash
 * @param data
 */
export const useGenSha256Hash = (data: string) => {
  return sha256(data);
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
