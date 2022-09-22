import fs from "fs";
import path from "path";

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
 * 读取路径下的所有子目录,返回绝对路径文件树
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
