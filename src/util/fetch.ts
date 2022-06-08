import { ResponseType, PromiseWithVoid, Method, ObjectType } from "../type";
import { useGenUrlParams } from "./index";
type ComFetchConfig = {
  headers?: ObjectType<string | number>;
  responseType?: string;
};
type CusFetchConfig = {
  method: Method;
  params?: ObjectType<string | number>;
  body?: ObjectType | any[];
  headers?: ObjectType<string | number>;
  responseType?: string;
};
type ComFetchOptions = {
  resHandler?: ((params: ResponseType) => ResponseType) | false;
  errHandler?: ((params: any) => any) | false;
  timeOut?: number;
};
type CusFetchOptions = {
  resHandler?: ((params: ResponseType) => ResponseType) | false;
  errHandler?: ((params: any) => any) | false;
  abortController?: AbortController[];
  timeOut?: number;
};

/**
 * @param baseURL 要以'/'开头，例：'/api'
 * @param comConfig params body headers handler errHandler
 * @returns
 */
export const useFetch = (baseURL: string = "/", comConfig: ComFetchConfig = {}, comOptions: ComFetchOptions = {}) => {
  /**
   * @param URL 要以'/'开头,例：'/user/list'
   * @param method
   * @param cusConfig params body headers handler errHandler
   * @returns
   */
  return async (URL: string, cusConfig: CusFetchConfig, cusOptions: CusFetchOptions = {}): PromiseWithVoid<ResponseType> => {
    /**处理url */
    let url = useGenUrlParams(baseURL + URL, cusConfig.params);

    /**处理config */
    let resConfig: any = { ...comConfig, ...cusConfig };
    resConfig.body = JSON.stringify(cusConfig.body);

    /**处理中间件 */
    const resHandler = cusOptions.resHandler || comOptions.resHandler;
    const errHandler = cusOptions.errHandler || comOptions.errHandler;

    /**如果传过来过期时间或收集终止控制器的数组则需要生成终止控制器 */
    const timeOut = cusOptions.timeOut || comOptions.timeOut;
    let abortControllerId: NodeJS.Timeout;
    if (timeOut || cusOptions.abortController) {
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

    /**返回请求结果 */
    return fetch(url, resConfig)
      .then((res: any) => {
        clearAbortController(comOptions, cusOptions, abortControllerId);
        /**如果有中间件，则先处理中间件 */
        if (resHandler) {
          resHandler(res);
        }
        return res;
      })
      .catch((err) => {
        clearAbortController(comOptions, cusOptions, abortControllerId);
        /**如果有中间件，则先处理中间件 */
        if (errHandler) {
          errHandler(err);
        }
        return err;
      });
  };
};
