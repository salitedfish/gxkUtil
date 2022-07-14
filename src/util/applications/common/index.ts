import { useCheckUndefined } from "../../dataOperate";
import SparkMD5 from "spark-md5";
import SHA256 from "crypto-js/sha256";
import Clipboard from "clipboard";
import { useCurryTwo } from "../../currying";
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 通过文件地址点击下载
 * @param url
 * @param name
 */
const useDownloadByURLShallow = (url: string, name = "file") => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};
export const useDownloadByURL = useCurryTwo<[url: string], [name?: string], void>(useDownloadByURLShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 从URL中获取文件名、文件名.扩展名
 * @param URL
 * @param withExt true表示携带扩展名
 * @returns
 */
const useFileNameFromURLShallow = (URL: string, withExt: boolean = false) => {
  const firstIndex = URL.lastIndexOf("/") + 1;
  const lastIndex = URL.lastIndexOf(".");
  if (withExt) {
    return URL.slice(firstIndex);
  } else {
    return URL.slice(firstIndex, lastIndex);
  }
};
export const useFileNameFromURL = useCurryTwo<[URL: string], [withExt?: boolean], string>(useFileNameFromURLShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 从URL中获取文件类型
 * @param URL
 * @param format 默认为false，false则直接返回扩展名，true为格式化为image，video等
 * @returns
 */
const useFileTypeFromURLShallow = (URL: string, format: boolean = false) => {
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
export const useFileTypeFromURL = useCurryTwo<[URL: string], [format?: boolean], string>(useFileTypeFromURLShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 组装url参数
 * @param url
 * @param params
 * @returns
 */
const useGenParamsUrlShallow = (url: string, params: { [key: string]: string | number }): string => {
  let resUrl: string;
  if (url[url.length - 1] === "?") {
    resUrl = url;
  } else {
    resUrl = url + "?";
  }
  for (const key in params) {
    resUrl = `${resUrl}${key}=${params[key]}&`;
  }
  return resUrl.slice(0, resUrl.length - 1);
};
export const useGenParamsUrl = useCurryTwo<[url: string], [params: { [key: string]: string | number }], string>(useGenParamsUrlShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 点击复制
 * @param text 复制的文字
 * @param domID 为了规范，统一传入dom的id
 */
const useClipboardShallow = (text: string, domID: string) => {
  return new Promise((resolve, reject) => {
    if (useCheckUndefined(text)) {
      return;
    }
    let clipboard = new Clipboard(domID, {
      text: function () {
        return text;
      },
    });
    clipboard.on("success", (e) => {
      e.clearSelection();
      resolve(e);
    });
    clipboard.on("error", () => {
      reject();
    });
  });
};
export const useClipboard = useCurryTwo<[text: string], [domID: string], Promise<unknown>>(useClipboardShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 计算文件或字符串MD5hash
 * @param data
 * @returns
 * md5加密安全性没sha256高，但是速度快点，这里文件加密用md5
 */
export const useGenMD5Hash = async (data: File | string | Blob) => {
  if (typeof data === "string") {
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
export const useStrSHA256Hash = (data: string) => {
  return SHA256(data).toString();
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
