/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断手机号是否合法
 * (/^[1][3,4,5,7,8][0-9]{9}$/)
 * @param phone
 */
export const usePhoneLegal = (phone: number | string) => {
  const phoneStr = phone.toString();
  const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (phoneReg.test(phoneStr)) {
    return true;
  } else {
    return false;
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 判断邮箱是否合法
 * (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)
 * @param email
 * @returns
 */
export const useEmailLegal = (email: string) => {
  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (emailReg.test(email)) {
    return true;
  } else {
    return false;
  }
};
