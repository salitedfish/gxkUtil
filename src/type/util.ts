export type CommonFu<V extends any[], T = void> = (...params: V) => T;

export type ObjectType<T = any> = {
  [key: string]: T;
};

export type ObjectReadonlyType<T = any> = {
  readonly [key: string]: T;
};

export type PromiseWithVoid<T> = Promise<void | T>;

export type ResponseType<T = any> = {
  readonly code: number;
  readonly data: T;
  readonly status?: number;
  readonly message?: string;
};

export type Method = "GET" | "DELETE" | "POST" | "PUT";

export type UseDebounce = <V extends any[]>(callBack: (...params: V) => unknown, countDown?: number) => (...params: V) => void;

export type UseThrottling = <V extends any[]>(callBack: (...params: V) => unknown, countDown?: number) => (...params: V) => void;

export type UseTimesClick = <V extends any[]>(callBack: (...params: V) => unknown, option?: { times?: number; countDown?: number; interval?: number }) => (...params: V) => void;

export type UsePromiseQueue = <V, T>(asyncCallBack: (params: V) => Promise<T>, isCondition: (params: T) => boolean, params: V, options?: { count?: number; countDown?: number }) => Promise<T>;
