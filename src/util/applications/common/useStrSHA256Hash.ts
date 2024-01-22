import { useCryptoJS } from "./index";

/**
 * 计算字符串sha256hash
 * @param data
 */
export const useStrSHA256Hash = (data: string) => {
  const SHA256 = useCryptoJS().SHA256;
  return SHA256(data).toString();
};
