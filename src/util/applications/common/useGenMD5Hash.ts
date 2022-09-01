import { hash as SparkMD5_Hash, ArrayBuffer as SparkMD5_ArrayBuffrt } from "spark-md5";

/**
 * 计算文件或字符串MD5hash
 * @param data
 * @returns
 * md5加密安全性没sha256高，但是速度快点，这里文件加密用md5
 */
export const useGenMD5Hash = async (data: File | string | Blob) => {
  if (typeof data === "string") {
    return SparkMD5_Hash(data);
  } else {
    //将文件读取成buffer数组
    const dataBufferArr = await data.arrayBuffer();
    //如果文件文件大于1m，则需要分块
    let chunkSize = 104857600;
    let chunks = Math.ceil(data.size / chunkSize);
    let currentChunk = 0;
    let spark = new SparkMD5_ArrayBuffrt();
    //循环将每块文件块计算hash
    while (currentChunk < chunks) {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= data.size ? data.size : start + chunkSize;
      spark.append(Buffer.from(dataBufferArr).slice(start, end));
      currentChunk++;
    }
    return spark.end();
  }
};
