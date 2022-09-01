import fs from "fs";

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
