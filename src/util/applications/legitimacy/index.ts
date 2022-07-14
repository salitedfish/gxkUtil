import { useCurryTwo } from "../../currying";
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
export const usePhoneLegal = useCurryTwo<[phone: number | string], [legal?: RegExp], boolean>(usePhoneLegalShallow);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断身份证是否合法
 * @param idCard 中国大陆身份证
 */
const useIDCargLegalShallow = (idCard: string, regIdCard: RegExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/) => {
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      const idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
      let idCardWiSum = 0;
      for (let i = 0; i < 17; i++) {
        idCardWiSum += Number(idCard.substring(i, i + 1)) * idCardWi[i];
      }
      const idCardMod = idCardWiSum % 11;
      const idCardLast = idCard.substring(17);
      if (idCardMod === 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        if (idCardLast === String(idCardY[idCardMod])) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};
export const useIDCargLegal = useCurryTwo<[idCard: string], [regIdCard?: RegExp], boolean>(useIDCargLegalShallow);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断邮箱是否合法
 * @param email
 * @param legal 默认/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
 */
const useEmailLegalShallow = (email: string, legal: RegExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/) => {
  if (legal.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const useEmailLegal = useCurryTwo<[email: string], [legal?: RegExp], boolean>(useEmailLegalShallow);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断IP是否合法
 * @param ip 仅支持IPV4
 */
export const useIPV4Legal = (ip: string) => {
  const ipArr = ip.split(".");
  if (ipArr.length != 4) {
    return false;
  }
  for (let item of ipArr) {
    const itemNum = Number(item);
    if (itemNum < 0 || itemNum > 255 || isNaN(itemNum)) {
      return false;
    }
  }
  return true;
};
