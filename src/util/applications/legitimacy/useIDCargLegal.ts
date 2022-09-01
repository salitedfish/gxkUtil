import { useCurryTwo } from "../../../util/currying";

/**
 * 判断身份证是否合法
 * @param idCard 中国大陆身份证
 */
const useIDCargLegalShallow = (
  idCard: string,
  regIdCard: RegExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
) => {
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
        if (idCardLast === "X" || idCardLast === "x") {
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
export const useIDCargLegal = useCurryTwo(useIDCargLegalShallow);
