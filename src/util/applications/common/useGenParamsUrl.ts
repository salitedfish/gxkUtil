import { useCurryTwo } from "../../../util/currying";

/**
 * 组装url参数
 * @param url
 * @param params
 * @returns
 */
const useGenParamsUrlShallow = (url: string, params: { [key: string]: string | number }): string => {
  let resUrl: string;
  if (url[url.length - 1] === "?") {
    resUrl = url;
  } else {
    resUrl = url + "?";
  }
  for (const key in params) {
    resUrl = `${resUrl}${key}=${params[key]}&`;
  }
  return resUrl.slice(0, resUrl.length - 1);
};
export const useGenParamsUrl = useCurryTwo(useGenParamsUrlShallow);
