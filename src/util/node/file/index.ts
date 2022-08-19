import fs from "fs";
import path from "path";
import { useCurryTwo } from "../../../util/currying";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 读取文件内容
 * @param fileAddress
 * @returns
 */
export function useReadFile(fileAddress: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileAddress, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 写入文件内容
 * @param fileAddress
 */
const useWriteFileShallow = (fileAddress: string, fileContent: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileAddress, fileContent, (err) => {
      if (err) {
        reject(err);
      }
      resolve("write success");
    });
  });
};
export const useWriteFile = useCurryTwo(useWriteFileShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 追加写入文件内容
 * @param fileAddress
 */
const useAppendFileShallow = (fileAddress: string, fileContent: string) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileAddress, fileContent, (err) => {
      if (err) {
        reject(err);
      }
      resolve("append success");
    });
  });
};
export const useAppendFile = useCurryTwo(useAppendFileShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type FileTreeItem = {
  filePathAbsolute: string;
  fileName: string;
  isFile: boolean;
  child?: FileTreeItem[];
};

/**
 * 判断此路径的文件是文件还是文件夹
 * @param filePath
 * @returns
 */
const useIsFile = async (filePath: string) => {
  const stat = await fs.promises.stat(filePath);
  return stat.isFile();
};
/**
 * 读取路径下的所有子目录
 * @param filePath 根路径
 * @returns
 */
export const useGetFileTree = async (filePath: string) => {
  const fileTree: FileTreeItem[] = [];
  const filenameArr = await fs.promises.readdir(filePath);

  for (let fileName of filenameArr) {
    /**最终显示的路径是绝对路径 */
    const filePathAbsolute = path.resolve(filePath, fileName);
    const isFile = await useIsFile(filePathAbsolute);
    const file: FileTreeItem = {
      filePathAbsolute,
      fileName,
      isFile,
      child: [],
    };
    /**判断是文件夹则递归获取文件树 */
    if (!isFile) {
      file.child = await useGetFileTree(filePathAbsolute);
    }
    fileTree.push(file);
  }
  return fileTree;
};
