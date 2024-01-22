// import base64 from "base-64";
// import utf8 from "utf8";
import { useCryptoJS } from "./index";

/**
 * base64转字符串
 * @param str
 * @returns
 */
export const useBase64ToString = (str: string) => {
  const CryptoJS = useCryptoJS();
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
};
