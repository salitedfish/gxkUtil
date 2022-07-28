import { Method, ObjectType } from "../../../type";
import { useGenParamsUrl } from "../../../util";
import { useCurryTwo } from "../../../util/currying";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type FetchMode = "cors" | "no-cors" | "same-origin" | "navigate";
type FetchCredentials = "omit" | "same-origin" | "include";
/**基础请求参数的类型 */
type ComFetchConfig = {
  baseURL?: string;
  headers?: HeadersInit;
  responseType?: string;
  mode?: FetchMode;
  credentials?: FetchCredentials;
  keepalive?: boolean;
};
type ComFetchOptions = {
  reqHandler?: (config: CusFetchConfig) => CusFetchConfig;
  resHandler?: (response: any, shallowResponse: Response) => any;
  errHandler?: (err: any) => any;
  timeOut?: number;
};
/**单个请求参数的类型 */
type CusFetchConfig = {
  URL: string;
  method: Method;
  params?: ObjectType<string | number>;
  body?: BodyInit | null | undefined;
  headers?: HeadersInit;
  responseType?: string;
  mode?: FetchMode;
  credentials?: FetchCredentials;
  signal?: AbortSignal;
  keepalive?: boolean;
};
type CusFetchOptions = {
  reqHandler?: (config: CusFetchConfig) => CusFetchConfig;
  resHandler?: (response: any) => any;
  errHandler?: (err: any) => any;
  abortController?: AbortController[];
  timeOut?: number;
};
/**处理后返回值类型 */
type ResponseType = any | Blob | FormData | string | FormData;
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**构造清空终止控制器函数，以便请求完成后删除终止控制器 */
const clearAbortController = (
  comOptions: ComFetchOptions,
  cusOptions: CusFetchOptions,
  abortControllerId: NodeJS.Timeout,
  signal: AbortSignal
) => {
  /**清空终止控制器延时器 */
  if (cusOptions.timeOut || comOptions.timeOut) {
    clearTimeout(abortControllerId);
  }
  /**删除终止控制器数组内对应的控制器*/
  if (Array.isArray(cusOptions.abortController)) {
    for (let key = 0; key < cusOptions.abortController.length; key++) {
      if (cusOptions.abortController[key].signal === signal) {
        cusOptions.abortController.splice(key, 1);
      }
    }
  }
};

/**处理返回值(还不完善，待后续情况添加解析类型) */
const handerResponse = (shallowResponse: Response): Promise<ResponseType> => {
  // arrayBuffer();
  const contentType = shallowResponse.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    return shallowResponse.json();
  } else if (contentType && contentType.match(/form-data/i)) {
    return shallowResponse.formData();
  } else if (
    contentType &&
    (contentType.match(/blob/i) || contentType.match(/application\/vnd/i))
  ) {
    return shallowResponse.blob();
  } else if (contentType && contentType.match(/text/i)) {
    return shallowResponse.text();
  } else {
    return shallowResponse.json();
  }
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
  const handler = async (
    cusConfig: CusFetchConfig,
    cusOptions: CusFetchOptions = {}
  ): Promise<ResponseType> => {
    /**处理url */
    let url = useGenParamsUrl(comConfig.baseURL + cusConfig.URL)(cusConfig.params || {});

    /**处理config */
    let resConfig = { ...comConfig, ...cusConfig };
    resConfig.headers = { ...comConfig.headers, ...cusConfig.headers };

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
        const reg = await handerResponse(res.clone());
        if (regConfig.signal) {
          clearAbortController(comOptions, cusOptions, abortControllerId, regConfig.signal);
        }
        /**如果有中间件，则先处理中间件，处理返回值。
         * comOptions.resHandler会把默认处理后的response和原始的resposne都传入，用户自行选择使用哪个。
         * cusOptions.resHandler则只传入comOptions.resHandler返回的结果。
         * */
        const ret = comOptions.resHandler ? comOptions.resHandler(reg, res) : reg;
        const rex = cusOptions.resHandler ? cusOptions.resHandler(ret) : ret;
        return rex;
      })
      .catch((err) => {
        if (regConfig.signal) {
          clearAbortController(comOptions, cusOptions, abortControllerId, regConfig.signal);
        }
        /**如果有中间件，则先处理中间件 */
        const ert = comOptions.errHandler ? comOptions.errHandler(err) : err;
        const erx = cusOptions.errHandler ? cusOptions.errHandler(ert) : ert;
        return Promise.reject(erx);
      });
  };
  return useCurryTwo(handler);
};

export const useFetch = useCurryTwo(useFetchShallow);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
//     body: JSON.stringify({ a: 1 }),
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
//   apiFetch({
//     URL: "/api",
//     method: "GET",
//     params: { a: 1 },
//     body: JSON.stringify({ a: 1 }),
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
// }
// useage;
