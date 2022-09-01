/**
 * 判断IP是否合法
 * @param ip 仅支持IPV4
 */
export const useIPV4Legal = (ip: string) => {
  const ipArr = ip.split(".");
  if (ipArr.length !== 4) {
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
