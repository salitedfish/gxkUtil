import { ResponseType, Method, ObjectType } from "src/type";
import { useGenParamsUrl } from "src/util";
import { useCurryTwo } from "src/util/currying";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type FetchMode = "cors" | "no-cors" | "same-origin" | "navigate";
type FetchCredentials = "omit" | "same-origin" | "include";
type ComFetchConfig = {
  baseURL?: string;
  headers?: ObjectType<string | number>;
  responseType?: string;
  mode?: FetchMode;
  credentials?: FetchCredentials;
};
type ComFetchOptions = {
  reqHandler?: (params: CusFetchConfig) => CusFetchConfig;
  resHandler?: (params: any) => any;
  errHandler?: (params: any) => any;
  timeOut?: number;
};
type CusFetchConfig = {
  URL: string;
  method: Method;
  params?: ObjectType<string | number>;
  body?: ObjectType | any[] | string;
  headers?: ObjectType<string | number>;
  responseType?: string;
  mode?: FetchMode;
  credentials?: FetchCredentials;
};
type CusFetchOptions = {
  reqHandler?: (params: CusFetchConfig) => CusFetchConfig;
  resHandler?: (params: any) => any;
  errHandler?: (params: any) => any;
  abortController?: AbortController[];
  timeOut?: number;
};

/**构造清空终止控制器函数，以便请求完成后清空终止控制器 */
const clearAbortController = (comOptions: ComFetchOptions, cusOptions: CusFetchOptions, abortControllerId: NodeJS.Timeout) => {
  /**清空终止控制器延时器 */
  if (cusOptions.timeOut || comOptions.timeOut) {
    clearTimeout(abortControllerId);
  }
  /**清空收集终止控制器数组*/
  if (Array.isArray(cusOptions.abortController)) {
    cusOptions.abortController.shift();
  }
};

/**处理返回值 */
const handerResponse = (shallowResponse: Response): Promise<ResponseType | Blob> => {
  const contentType = shallowResponse.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    return shallowResponse.json();
  } else if (contentType && contentType.match(/application\/csv/i)) {
    return shallowResponse.blob();
  } else {
    return shallowResponse.json();
  }
};

/**
 * @param comConfig baseURL headers responseType mode credentials
 * @param comOptions reqHandler resHandler errHandler timeOut
 * @returns 自定义fetch
 */
const useFetchShallow = (comConfig: ComFetchConfig = {}, comOptions: ComFetchOptions = {}) => {
  /**
   * @param cusConfig URL method headers params body responseType mode credentails
   * @param cusOptions reqHandler resHandler errHandler timeOut abortController
   * @returns 原生fetch
   */
  const handler = async (cusConfig: CusFetchConfig, cusOptions: CusFetchOptions = {}): Promise<any> => {
    /**处理url */
    let url = useGenParamsUrl(comConfig.baseURL + cusConfig.URL)(cusConfig.params || {});

    /**处理config */
    let resConfig: any = { ...comConfig, ...cusConfig };
    resConfig.headers = { ...comConfig.headers, ...cusConfig.headers };
    resConfig.body = JSON.stringify(cusConfig.body);

    /**如果传过来过期时间或收集终止控制器的数组则需要生成终止控制器 */
    const timeOut = cusOptions.timeOut || comOptions.timeOut;
    let abortControllerId: NodeJS.Timeout;
    if (timeOut || Array.isArray(cusOptions.abortController)) {
      const abortController = new AbortController();
      resConfig.signal = abortController.signal;
      /**设置过期时间，以便自动调用 */
      if (timeOut) {
        abortControllerId = setTimeout(() => {
          abortController.abort();
        }, timeOut);
      }
      /**收集终止控制器，以便手动调用 */
      if (Array.isArray(cusOptions.abortController)) {
        cusOptions.abortController.push(abortController);
      }
    }

    /**请求前先执行，类似于请求拦截器 */
    const retConfig = comOptions.reqHandler ? comOptions.reqHandler(resConfig) : resConfig;
    const regConfig = cusOptions.reqHandler ? cusOptions.reqHandler(retConfig) : retConfig;

    /**返回请求结果 */
    return fetch(url, regConfig)
      .then(async (res: Response) => {
        const reg = await handerResponse(res);
        clearAbortController(comOptions, cusOptions, abortControllerId);
        /**如果有中间件，则先处理中间件，处理返回值 */
        const ret = comOptions.resHandler ? comOptions.resHandler(reg) : reg;
        const rex = cusOptions.resHandler ? cusOptions.resHandler(ret) : ret;
        return rex;
      })
      .catch((err) => {
        clearAbortController(comOptions, cusOptions, abortControllerId);
        /**如果有中间件，则先处理中间件 */
        const ret = comOptions.errHandler ? comOptions.errHandler(err) : err;
        const rex = cusOptions.errHandler ? cusOptions.errHandler(ret) : ret;
        return Promise.reject(rex);
      });
  };
  return useCurryTwo<[cusConfig: CusFetchConfig], [cusOptions?: CusFetchOptions], Promise<any>>(handler);
};

type FetchOverload = { (cusConfig: CusFetchConfig): (cusOptions?: CusFetchOptions) => Promise<any>; (cusConfig: CusFetchConfig, cusOptions?: CusFetchOptions): Promise<any> };
export const useFetch = useCurryTwo<[comConfig?: ComFetchConfig], [comOptions?: ComFetchOptions], FetchOverload>(useFetchShallow);

/**useage */
// function useage() {
//   const apiFetch = useFetch({
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })({
//     reqHandler: (resConfig) => {
//       return { ...resConfig, token: "123" };
//     },
//     resHandler: (res) => {
//       return res;
//     },
//     errHandler: () => {},
//     timeOut: 10000,
//   });
//   apiFetch({
//     URL: "/api",
//     method: "GET",
//     params: { a: 1 },
//     body: { a: 1 },
//     headers: {
//       "Content-type": "text",
//     },
//     responseType: "blob",
//   })({
//     reqHandler: (resConfig) => {
//       return resConfig;
//     },
//     resHandler: () => {},
//     errHandler: () => {
//       console.log("err");
//     },
//     abortController: [],
//     timeOut: 5000,
//   }).then();
//   apiFetch(
//     {
//       URL: "/api",
//       method: "GET",
//       params: { a: 1 },
//       body: { a: 1 },
//       headers: {
//         "Content-type": "text",
//       },
//       responseType: "blob",
//     },
//     {
//       reqHandler: (resConfig) => {
//         return resConfig;
//       },
//       resHandler: () => {},
//       errHandler: () => {
//         console.log("err");
//       },
//       abortController: [],
//       timeOut: 5000,
//     }
//   ).then();
// }
// useage;
