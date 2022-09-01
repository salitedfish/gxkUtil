import { useCurryTwo } from "../../../util/currying";

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
export const useFileTypeFromURL = useCurryTwo(useFileTypeFromURLShallow);
