import { ResponseType, PromiseWithVoid, Method, ObjectType } from "../type";
type FetchConfig = {
  params?: ObjectType<string | number>;
  body?: ObjectType | any[];
  headers?: ObjectType<string | number>;
  handler?: ((params: ResponseType) => ResponseType) | "false";
  errHandler?: ((params: any) => any) | "false";
  abortController?: AbortController[];
  timeOut?: number;
};
/**
 * @param baseURL 要以'/'开头，例：'/api'
 * @param comConfig params body headers handler errHandler
 * @returns
 */
export const useFetch = (baseURL: string, comConfig: FetchConfig = {}) => {
  /**
   * @param URL 要以'/'开头,例：'/user/list'
   * @param method
   * @param cusConfig params body headers handler errHandler
   * @returns
   */
  return async (URL: string, method: Method, cusConfig: FetchConfig = {}): PromiseWithVoid<ResponseType> => {
    /**处理url */
    let url = baseURL + URL + "?";
    if (cusConfig.params) {
      for (const key in cusConfig.params) {
        url = `${url}${key}=${cusConfig.params[key]}&`;
      }
    }
    url = url.slice(0, url.length - 1);

    /**处理config */
    let resConfig: any;

    /**处理headers */
    const resHeaders = {
      "Content-Type": "application/json",
      ...comConfig.headers,
      ...cusConfig.headers,
    };
    resConfig.headers = resHeaders;
    /**处理body */
    resConfig.body = JSON.stringify(cusConfig.body);

    /**处理method */
    resConfig.method = method;

    /**处理中间件 */
    let handler: any;
    if (cusConfig.handler !== "false") {
      handler = cusConfig.handler || comConfig.handler;
    }
    let errHandler: any;
    if (cusConfig.errHandler !== "false") {
      errHandler = cusConfig.errHandler || comConfig.errHandler;
    }

    /**如果传过来过期时间或收集终止控制器的数组则需要生成终止控制器 */
    const timeOut = cusConfig.timeOut || comConfig.timeOut;
    let abortControllerId: any;
    if (timeOut || cusConfig.abortController) {
      const abortController = new AbortController();
      resConfig.signal = abortController.signal;
      /**设置过期时间，以便自动调用 */
      if (timeOut) {
        abortControllerId = setTimeout(() => {
          abortController.abort();
        }, timeOut);
      }
      /**收集终止控制器，以便手动调用 */
      if (Array.isArray(cusConfig.abortController)) {
        cusConfig.abortController.push(abortController);
      }
    }

    /**构造清空终止控制器函数，以便请求完成后清空终止控制器 */
    const clearAbortController = (comConfig: FetchConfig, cusConfig: FetchConfig, abortControllerId: number) => {
      /**清空终止控制器延时器 */
      if (cusConfig.timeOut || comConfig.timeOut) {
        clearTimeout(abortControllerId);
      }
      /**清空收集终止控制器数组*/
      if (Array.isArray(cusConfig.abortController)) {
        cusConfig.abortController.shift();
      }
    };

    /**返回请求结果 */
    return fetch(url, resConfig)
      .then((res: any) => {
        clearAbortController(comConfig, cusConfig, abortControllerId);
        /**如果有中间件，则先处理中间件 */
        if (handler) {
          if (handler(res)) {
            return handler(res);
          }
        } else {
          return res;
        }
      })
      .catch((err) => {
        clearAbortController(comConfig, cusConfig, abortControllerId);
        /**如果有中间件，则先处理中间件 */
        if (errHandler) {
          if (errHandler(err)) {
            return errHandler(err);
          }
        } else {
          return err;
        }
      });
  };
};
