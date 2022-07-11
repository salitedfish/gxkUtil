import fs from "fs";

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
export function useWriteFile(fileAddress: string): (fileContent: string) => Promise<string>;
export function useWriteFile(fileAddress: string, fileContent: string): Promise<string>;
export function useWriteFile(fileAddress: string, fileContent?: string) {
  const handler = async (fileContent: string) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileAddress, fileContent, (err) => {
        if (err) {
          reject(err);
        }
        resolve("write success");
      });
    });
  };
  if (fileContent === undefined) {
    return handler;
  } else {
    return handler(fileContent);
  }
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 追加写入文件内容
 * @param fileAddress
 */
export function useAppendFile(fileAddress: string): (fileContent: string) => Promise<string>;
export function useAppendFile(fileAddress: string, fileContent: string): Promise<string>;
export function useAppendFile(fileAddress: string, fileContent?: string) {
  const handler = async (fileContent: string) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(fileAddress, fileContent, (err) => {
        if (err) {
          reject(err);
        }
        resolve("append success");
      });
    });
  };
  if (fileContent === undefined) {
    return handler;
  } else {
    return handler(fileContent);
  }
}
