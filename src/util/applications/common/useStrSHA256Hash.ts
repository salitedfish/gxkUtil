import SHA256 from "crypto-js/sha256";

/**
 * 计算字符串sha256hash
 * @param data
 */
export const useStrSHA256Hash = (data: string) => {
  return SHA256(data).toString();
};
