import fs from "fs";
import path from "path";

import { useCurryTwo } from "../../../util/currying";

/**
 * 追加写入文件内容
 * @param fileAddress
 */
const useAppendFileShallow = (fileAddress: string, fileContent: string) => {
  return new Promise((resolve, reject) => {
    const fullAddress = path.resolve(__dirname, fileAddress);
    fs.appendFile(fullAddress, fileContent, (err) => {
      if (err) {
        reject(err);
      }
      resolve("append success");
    });
  });
};
export const useAppendFile = useCurryTwo(useAppendFileShallow);
