import type { Method, ObjectType } from "../../../type";
import { useGenParamsUrl } from "../../../util";
import { useConsoleWarn } from "../../../useInside";
// import { useCurryTwo } from "../../../util/currying";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**基础请求参数的类型 */
interface ComFetchConfig extends RequestInit {
  baseURL?: string;
  method?: Method;
}
/**父请求配置 */
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
/**子请求配置 */
/**pure为true时，会跳过父请求的相关拦截器 */
type CusFetchOptions = {
  pureHeaders?: boolean;
  reqHandler?: (config: CusFetchConfig) => CusFetchConfig;
  pureReqHandler?: boolean;
  resHandler?: (response: any, shallowResponse: Response) => any;
  pureResHandler?: boolean;
  errHandler?: (ert: any, err: any) => any;
  pureErrHandler?: boolean;
  requestId?: keyof any;
  timeOut?: number;
};
/**处理后返回值类型 */
type ResponseTypeMethod = keyof Omit<Body, "body" | "bodyUsed">;
type ResponseType = ObjectType | Blob | FormData | string | ArrayBuffer;
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 父类(抽象类)主要是fetch的基础封装
 */
abstract class BaseFetch {
  /**response header的content-type关键字对应response方法名的映射 */
  private readonly responseTypeMap: ObjectType<ResponseTypeMethod> = {
    json: "json",
    vnd: "blob",
    arrayBuffer: "arrayBuffer",
    blob: "blob",
    text: "text",
    form: "formData",
  };
  /**实例下所有的取消控制器 */
  private readonly abortControllers: Map<keyof any, AbortController> = new Map();
  constructor(private comConfig: ComFetchConfig, private comOptions: ComFetchOptions) {}
  /**合并请求URL */
  private createURL(comConfig: ComFetchConfig, cusConfig: CusFetchConfig) {
    comConfig.baseURL ||= "";
    cusConfig.params ||= {};
    return useGenParamsUrl(comConfig.baseURL + cusConfig.URL)(cusConfig.params);
  }
  /**合并请求配置 */
  private createRequestConfig(comConfig: ComFetchConfig, cusConfig: CusFetchConfig, cusOptions: CusFetchOptions) {
    /**这里合并完对比原生fetch的config多了URL、params、baseURL，但是应该不影响使用 */
    const resConfig = { ...comConfig, ...cusConfig };
    /**当pureHeaders为ture时只用cusConfig的headers，默认为fdalse */
    /**便于子请求去除父请求的headers */
    if (cusOptions.pureHeaders) {
      resConfig.headers = cusConfig.headers;
    } else {
      resConfig.headers = { ...comConfig.headers, ...cusConfig.headers };
    }
    return resConfig;
  }
  /**创建取消控制器 */
  private createAbortController(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, resConfig: ComFetchConfig & CusFetchConfig) {
    const timeOut = cusOptions.timeOut || comOptions.timeOut;
    const abortId = cusOptions.requestId;
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
  /**处理请求拦截器 */
  private requestInterceptor(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, resConfig: ComFetchConfig & CusFetchConfig) {
    const retConfig = cusOptions.pureReqHandler ? resConfig : comOptions.reqHandler ? comOptions.reqHandler(resConfig) : resConfig;
    const regConfig = cusOptions.reqHandler ? cusOptions.reqHandler(retConfig) : retConfig;
    return regConfig;
  }
  /**清空取消控制器 */
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
  /**处理响应处理器 */
  private async responseHandler(shallowResponse: Response): Promise<Promise<ResponseType> | undefined> {
    const contentType = shallowResponse.headers.get("Content-Type");
    /**根据接口返回的Content-Type来进行对应的响应值处理 */
    for (let key in this.responseTypeMap) {
      if (contentType && contentType.includes(key)) {
        const res = await shallowResponse[this.responseTypeMap[key]]();
        return res;
      }
    }
    useConsoleWarn("handerResponse: 未匹配到返回值类型!");
    return undefined;
  }
  /**处理响应拦截器 */
  private responseInterceptor(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, reg: ResponseType | undefined, res: Response): any {
    /**
     * comOptions.resHandler会把默认处理后的response和原始的resposne都传入，用户自行选择使用哪个。
     * cusOptions.resHandler会把comOptions.resHandler返回的结果和原始的resposne都传入，用户自行选择使用哪个。
     */
    const ret = cusOptions.pureResHandler ? reg : comOptions.resHandler ? comOptions.resHandler(reg, res) : reg;
    const rex = cusOptions.resHandler ? cusOptions.resHandler(ret, res) : ret;
    return rex;
  }
  /**处理错误拦截器 */
  private errInterceptor(comOptions: ComFetchOptions, cusOptions: CusFetchOptions, err: any): any {
    const ert = cusOptions.pureErrHandler ? err : comOptions.errHandler ? comOptions.errHandler(err) : err;
    const erx = cusOptions.errHandler ? cusOptions.errHandler(ert, err) : ert;
    return erx;
  }
  /**---发起请求---> */
  public async request<T = any>(cusConfig: CusFetchConfig = {}, cusOptions: CusFetchOptions = {}): Promise<T> {
    const URL = this.createURL(this.comConfig, cusConfig);
    const resConfig = this.createRequestConfig(this.comConfig, cusConfig, cusOptions);
    const { timeoutId, abortId } = this.createAbortController(this.comOptions, cusOptions, resConfig);
    const regConfig = this.requestInterceptor(this.comOptions, cusOptions, resConfig);

    /**发送请求 */
    try {
      const res = await fetch(URL, regConfig);

      if (regConfig.signal) {
        this.clearAbortController(timeoutId, abortId);
      }
      /**处理返回结果 */
      const reg = await this.responseHandler(res.clone());

      /**如果有拦截器，则先处理拦截器，处理返回值 */
      const rex = this.responseInterceptor(this.comOptions, cusOptions, reg, res);

      return rex;
    } catch (err) {
      if (regConfig.signal) {
        this.clearAbortController(timeoutId, abortId);
      }
      /**如果有拦截器，则先处理拦截器 */
      const erx = this.errInterceptor(this.comOptions, cusOptions, err);
      return Promise.reject(erx);
    }
  }
  /**---取消请求---> */
  public abortRequest(requestId: keyof any) {
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

/**
 * 子类主要用来分化请求方法
 */
export class UltraFetch extends BaseFetch {
  constructor(comConfig: ComFetchConfig = {}, comOptions: ComFetchOptions = {}) {
    super(comConfig, comOptions);
  }
  public async get<T = any>(cusConfig: Omit<CusFetchConfig & { method?: "GET" }, "body"> = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "GET";
    return await this.request<T>(cusConfig, cusOptions);
  }
  public async post<T = any>(cusConfig: CusFetchConfig & { method?: "POST" } = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "POST";
    return await this.request<T>(cusConfig, cusOptions);
  }
  public async delete<T = any>(cusConfig: CusFetchConfig & { method?: "DELETE" } = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "DELETE";
    return await this.request<T>(cusConfig, cusOptions);
  }
  public async put<T = any>(cusConfig: CusFetchConfig & { method?: "PUT" } = {}, cusOptions: CusFetchOptions = {}) {
    cusConfig.method = "PUT";
    return await this.request<T>(cusConfig, cusOptions);
  }
}

/**
 * 创建fetch实例
 * @param comConfig 主要是传参、header配置等
 * @param comOptions 主要是拦截器、过期时间等
 * @returns
 */
export const createFetch = (comConfig: ComFetchConfig = {}, comOptions: ComFetchOptions = {}) => {
  return new UltraFetch(comConfig, comOptions);
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// /**
//  * 分块下载处理下载进度
//  * @param response
//  * @param cb
//  * @returns
//  */
// export const downloadProcessHandler = async (response: Response, cb: (percent: number) => void) => {
//   const reader = response.body?.getReader();
//   if (!reader) return;
//   const contentLength = Number(response.headers.get("Content-Length"));
//   let receivedLength = 0;
//   const chunks = [];
//   let percent: number;
//   /**处理完成的比例*/
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) {
//       break;
//     }
//     chunks.push(value);
//     receivedLength = receivedLength + value.length;
//     percent = receivedLength / contentLength;
//     cb(percent);
//   }
//   /**处理分块后的数据 */
//   const chunksAll = new Uint8Array(receivedLength);
//   let position = 0;
//   for (const chunk of chunks) {
//     chunksAll.set(chunk, position);
//     position = position + chunk.length;
//   }
//   const result = new TextDecoder("utf-8").decode(chunksAll);
//   return result;
// };
