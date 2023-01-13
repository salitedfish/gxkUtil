import fs from "fs";
import path from "path";
/**
 * 读取文件内容
 * @param fileAddress
 * @returns
 */
export function useNodeReadFile(fileAddress: string) {
  return new Promise((resolve, reject) => {
    const fullAddress = path.resolve(__dirname, fileAddress);
    fs.readFile(fullAddress, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
