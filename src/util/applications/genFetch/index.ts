import { Method, ObjectType } from "../../../type";
import { useGenParamsUrl } from "../../../util";
import { useConsoleWarn } from "../../../useInside";
import { useCurryTwo } from "../../../util/currying";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**基础请求参数的类型 */
interface ComFetchConfig extends RequestInit {
  baseURL?: string;
  method?: Method;
}
type ComFetchOptions = {
  reqHandler?: (config: CusFetchConfig) => CusFetchConfig;
  resHandler?: (response: any, shallowResponse: Response) => any;
  errHandler?: (err: any) => any;
  timeOut?: number;
};
/**单个请求参数的类型 */
interface CusFetchConfig extends RequestInit {
  URL?: string;
  method?: Method;
  params?: ObjectType<string | number>;
}
type CusFetchOptions = {
  reqHandler?: (config: CusFetchConfig) => CusFetchConfig;
  resHandler?: (response: any) => any;
  errHandler?: (err: any) => any;
  reqestId?: keyof any;
  timeOut?: number;
};
/**处理后返回值类型 */
type ResponseTypeMethod = keyof Omit<Body, "body" | "bodyUsed">;
type ResponseType = ObjectType | Blob | FormData | string | ArrayBuffer;
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export class UseFetch {
  static readonly responseTypeMap: ObjectType<ResponseTypeMethod> = {
    json: "json",
    form: "formData",
    blob: "blob",
    vnd: "blob",
    text: "text",
    arrayBuffer: "arrayBuffer",
  };
  private abortControllers: Map<keyof any, AbortController> = new Map();
  private comConfig: ComFetchConfig;
  private comOptions: ComFetchOptions;

  constructor(comConfig: ComFetchConfig, comOptions: ComFetchOptions = {}) {
    this.comConfig = comConfig;
    this.comOptions = comOptions;
  }
  /**请求过程中处理 */
  private initURL(comConfig: ComFetchConfig, cusConfig: CusFetchConfig = {}) {
    return useGenParamsUrl(comConfig.baseURL || "" + cusConfig.URL)(cusConfig.params || {});
  }
  private initResConfig(comConfig: ComFetchConfig, cusConfig: CusFetchConfig = {}) {
    const resConfig = { ...comConfig, ...cusConfig };
    resConfig.headers = { ...comConfig.headers, ...cusConfig.headers };
    return resConfig;
  }
  private initAbortController(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, resConfig: ComFetchConfig & CusFetchConfig) {
    const timeOut = cusOptions.timeOut || comOptions.timeOut;
    const abortId = cusOptions.reqestId;
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (timeOut || abortId) {
      const abortController = new AbortController();
      resConfig.signal = abortController.signal;
      /**设置过期时间，以便自动调用 */
      if (timeOut) {
        timeoutId = setTimeout(() => {
          abortController.abort();
        }, timeOut);
      }
      /**收集取消控制器，以便手动调用 */
      if (abortId) {
        /**先取消之前相同id的请求（如果有的话）*/
        this.abortRequest(abortId);
        /**再设置新的取消控制器*/
        this.abortControllers.set(abortId, abortController);
      }
    }
    return {
      timeoutId,
      abortId,
    };
  }
  private initRegConfig(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, resConfig: ComFetchConfig & CusFetchConfig) {
    const retConfig = comOptions.reqHandler ? comOptions.reqHandler(resConfig) : resConfig;
    const regConfig = cusOptions.reqHandler ? cusOptions.reqHandler(retConfig) : retConfig;
    return regConfig;
  }
  private clearAbortController(timeoutId: NodeJS.Timeout | undefined, abortId: keyof any | undefined) {
    /**清空取消控制器延时器 */
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    /**删除取消控制器map内对应的控制器*/
    if (abortId) {
      this.abortControllers.delete(abortId);
    }
  }
  private handleResponse(shallowResponse: Response): Promise<ResponseType> | undefined {
    const contentType = shallowResponse.headers.get("Content-Type");
    for (let key in UseFetch.responseTypeMap) {
      if (contentType && contentType.includes(key)) {
        return shallowResponse[UseFetch.responseTypeMap[key]]();
      }
    }
    useConsoleWarn("handerResponse: 未匹配到返回值类型!");
    return undefined;
  }
  /**发起请求 */
  async request<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}): Promise<T> {
    /**处理url */
    const URL = this.initURL(this.comConfig, cusConfig);
    /**合并请求配置 */
    const resConfig = this.initResConfig(this.comConfig, cusConfig);
    /**初始化取消控制器 */
    const { timeoutId, abortId } = this.initAbortController(this.comOptions, cusOptions, resConfig);
    /**处理请求拦截器 */
    const regConfig = this.initRegConfig(this.comOptions, cusOptions, resConfig);

    /**发送请求 */
    return fetch(URL, regConfig)
      .then(async (res: Response) => {
        if (regConfig.signal) {
          this.clearAbortController(timeoutId, abortId);
        }
        /**处理返回结果 */
        const reg = await this.handleResponse(res.clone());
        /**如果有拦截器，则先处理拦截器，处理返回值。
         * comOptions.resHandler会把默认处理后的response和原始的resposne都传入，用户自行选择使用哪个。
         * cusOptions.resHandler则只传入comOptions.resHandler返回的结果。
         * */
        const ret = this.comOptions.resHandler ? this.comOptions.resHandler(reg, res) : reg;
        const rex = cusOptions.resHandler ? cusOptions.resHandler(ret) : ret;
        return rex;
      })
      .catch((err) => {
        if (regConfig.signal) {
          this.clearAbortController(timeoutId, abortId);
        }
        /**如果有拦截器，则先处理拦截器 */
        const ert = this.comOptions.errHandler ? this.comOptions.errHandler(err) : err;
        const erx = cusOptions.errHandler ? cusOptions.errHandler(ert) : ert;
        return Promise.reject(erx);
      });
  }
  async get<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "GET";
    return await this.request<T>(cusConfig, cusOptions);
  }
  async post<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "POST";
    return await this.request<T>(cusConfig, cusOptions);
  }
  async delete<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "DELETE";
    return await this.request<T>(cusConfig, cusOptions);
  }
  async put<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "PUT";
    return await this.request<T>(cusConfig, cusOptions);
  }
  /**取消请求 */
  abortRequest(requestId: keyof any) {
    const oldAbortController = this.abortControllers.get(requestId);
    if (oldAbortController) {
      oldAbortController.abort();
      this.abortControllers.delete(requestId);
      return true;
    } else {
      return false;
    }
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**收集取消控制器的map */
const abortControllers: Map<keyof any, AbortController> = new Map();

/**设置取消控制器 */
const abortControllerHandler = (comOptions: ComFetchOptions, cusOptions: CusFetchOptions, resConfig: CusFetchConfig) => {
  const timeOut = cusOptions.timeOut || comOptions.timeOut;
  const abortId = cusOptions.reqestId;
  let timeoutId: NodeJS.Timeout | undefined = undefined;
  if (timeOut || abortId) {
    const abortController = new AbortController();
    resConfig.signal = abortController.signal;
    /**设置过期时间，以便自动调用 */
    if (timeOut) {
      timeoutId = setTimeout(() => {
        abortController.abort();
      }, timeOut);
    }
    /**收集取消控制器，以便手动调用 */
    if (abortId) {
      /**先取消之前相同id的请求（如果有的话）*/
      useAbortFetch(abortId);
      /**再设置新的取消控制器*/
      abortControllers.set(abortId, abortController);
    }
  }
  return {
    timeoutId,
    abortId,
  };
};

/**构造清空取消控制器函数，以便请求完成后删除取消控制器 */
const clearAbortController = (timeoutId: NodeJS.Timeout | undefined, abortId: keyof any | undefined) => {
  /**清空取消控制器延时器 */
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  /**删除取消控制器map内对应的控制器*/
  if (abortId) {
    abortControllers.delete(abortId);
  }
};

/**导出个方法给用户调用取消请求 */
export const useAbortFetch = (requestId: keyof any) => {
  const oldAbortController = abortControllers.get(requestId);
  if (oldAbortController) {
    oldAbortController.abort();
    abortControllers.delete(requestId);
    return true;
  } else {
    return false;
  }
};

/**返回值类型和方法映射*/
const responseTypeMap: ObjectType<ResponseTypeMethod> = {
  json: "json",
  form: "formData",
  blob: "blob",
  vnd: "blob",
  text: "text",
  arrayBuffer: "arrayBuffer",
};

/**根据类型处理返回值 */
const handerResponse = (shallowResponse: Response): Promise<ResponseType> | undefined => {
  const contentType = shallowResponse.headers.get("Content-Type");
  for (let key in responseTypeMap) {
    if (contentType && contentType.includes(key)) {
      return shallowResponse[responseTypeMap[key]]();
    }
  }
  useConsoleWarn("handerResponse: 未匹配到返回值类型!");
  return undefined;
};
/**
 * @param comConfig
 * @param comOptions reqHandler resHandler errHandler timeOut
 * @returns 自定义fetch
 */
const useFetchShallow = (comConfig: ComFetchConfig, comOptions: ComFetchOptions = {}) => {
  /**
   * @param cusConfig
   * @param cusOptions reqHandler resHandler errHandler timeOut requestId
   * @returns 原生fetch
   */
  const handler = async (cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}): Promise<ResponseType> => {
    /**处理url */
    let url = useGenParamsUrl(comConfig.baseURL || "" + cusConfig.URL)(cusConfig.params || {});

    /**处理config */
    let resConfig = { ...comConfig, ...cusConfig };
    resConfig.headers = { ...comConfig.headers, ...cusConfig.headers };

    /**如果传过来过期时间或收集取消控制器的数组则需要生成取消控制器 */
    const { timeoutId, abortId } = abortControllerHandler(comOptions, cusOptions, resConfig);

    /**请求前先执行，类似于请求拦截器 */
    const retConfig = comOptions.reqHandler ? comOptions.reqHandler(resConfig) : resConfig;
    const regConfig = cusOptions.reqHandler ? cusOptions.reqHandler(retConfig) : retConfig;

    /**返回请求结果 */
    return fetch(url, regConfig)
      .then(async (res: Response) => {
        /**处理返回结果 */
        const reg = await handerResponse(res.clone());
        if (regConfig.signal) {
          clearAbortController(timeoutId, abortId);
        }
        /**如果有拦截器，则先处理拦截器，处理返回值。
         * comOptions.resHandler会把默认处理后的response和原始的resposne都传入，用户自行选择使用哪个。
         * cusOptions.resHandler则只传入comOptions.resHandler返回的结果。
         * */
        const ret = comOptions.resHandler ? comOptions.resHandler(reg, res) : reg;
        const rex = cusOptions.resHandler ? cusOptions.resHandler(ret) : ret;
        return rex;
      })
      .catch((err) => {
        if (regConfig.signal) {
          clearAbortController(timeoutId, abortId);
        }
        /**如果有拦截器，则先处理拦截器 */
        const ert = comOptions.errHandler ? comOptions.errHandler(err) : err;
        const erx = cusOptions.errHandler ? cusOptions.errHandler(ert) : ert;
        return Promise.reject(erx);
      });
  };
  return useCurryTwo(handler);
};

export const useFetch = useCurryTwo(useFetchShallow);
