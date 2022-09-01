import { useCurryTwo } from "../../../util/currying";

/**
 * 判断手机号是否合法
 * @param phone 手机号
 * @param legal 默认/^[1][3,4,5,7,8][0-9]{9}$/，默认中国大陆手机号，120、110等不算
 */
const usePhoneLegalShallow = (phone: number | string, legal: RegExp = /^[1][3,4,5,7,8][0-9]{9}$/) => {
  const phoneStr = phone.toString();
  if (legal.test(phoneStr)) {
    return true;
  } else {
    return false;
  }
};
export const usePhoneLegal = useCurryTwo(usePhoneLegalShallow);
