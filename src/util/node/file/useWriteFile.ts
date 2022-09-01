import fs from "fs";
import { useCurryTwo } from "../../../util/currying";

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
