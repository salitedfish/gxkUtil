import fs from "fs";
import path from "path";
import { useCurryTwo } from "../../currying";

/**
 * 写入文件内容
 * @param fileAddress
 */
const useNodeWriteFileShallow = (fileAddress: string, fileContent: string) => {
  return new Promise((resolve, reject) => {
    const fullAddress = path.resolve(__dirname, fileAddress);
    fs.writeFile(fullAddress, fileContent, (err) => {
      if (err) {
        reject(err);
      }
      resolve("write success");
    });
  });
};
export const useNodeWriteFile = useCurryTwo(useNodeWriteFileShallow);
