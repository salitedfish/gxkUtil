import { ResponseType, PromiseWithVoid, Method, ObjectType } from "../type";
type FetchConfig = {
  params?: ObjectType<string | number>;
  body?: ObjectType | any[];
  headers?: ObjectType<string | number>;
  handler?: ((params: ResponseType) => ResponseType) | "false";
  errHandler?: ((params: any) => any) | "false";
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

    /**返回请求结果 */
    return fetch(url, resConfig)
      .then((res: any) => {
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

/**usage */
const apiFetch = useFetch("/api", {
  headers: {
    token: "sdfsfdsfef",
  },
  handler: (res) => {
    return res;
  },
  errHandler: (err) => {},
});

const test = async (): PromiseWithVoid<ResponseType<{ a: number; b: number }>> => {
  return await apiFetch("/home", "GET", {
    params: { name: "gxk" },
  });
};

(async () => {
  const res = await test();
  if (res) {
    res.data.a;
  }
})();
