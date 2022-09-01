import { useCurryTwo } from "../../../util/currying";

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
export const useDownloadByURL = useCurryTwo(useDownloadByURLShallow);
