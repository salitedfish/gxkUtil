import fs from "fs";
import { useCurryTwo } from "src/util/currying";

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
export const useWriteFile = useCurryTwo<[fileAddress: string], [fileContent: string], Promise<unknown>>(useWriteFileShallow);
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
export const useAppendFile = useCurryTwo<[fileAddress: string], [fileContent: string], Promise<unknown>>(useAppendFileShallow);
