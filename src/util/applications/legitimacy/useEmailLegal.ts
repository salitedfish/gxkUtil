import { useCurryTwo } from "../../../util/currying";

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
export const useEmailLegal = useCurryTwo(useEmailLegalShallow);
