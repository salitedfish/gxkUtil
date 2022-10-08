import { useConsoleWarn } from "../../../useInside";
/**
 * 构造UUID(还没写好)
 * @returns
 */
export const useGenUUID = () => {
  if (Blob) {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url); //释放这个url
    return uuid.substring(uuid.lastIndexOf("/") + 1);
  } else {
    useConsoleWarn("useGenUUID: 当前环境无法使用Blob!");
    return false;
  }
};
