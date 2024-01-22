// import base64 from "base-64";
// import utf8 from "utf8";
import { useCryptoJS } from "./index";

/**
 * 字符串转base64
 * @param str
 * @returns
 */
export const useStringToBase64 = (str: string) => {
  //   return base64.encode(utf8.encode(str));
  const CryptoJS = useCryptoJS();
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
};
