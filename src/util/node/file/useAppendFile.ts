import fs from "fs";
import { useCurryTwo } from "../../../util/currying";

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
