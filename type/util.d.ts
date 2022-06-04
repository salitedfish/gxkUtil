type CommonFu<Params extends any[] = any[], Result = void> = (...params: Params) => Result;

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

export type UseTimesClick = <V extends any[]>(callBack: (...params: V) => unknown,  option?: {times?: number,countDown?: number, interval?: number} ) => (...params: V) => void;

export type UsePromiseQueue<U = any> = <V extends { [key: string]: any }, T extends U>(asyncCallBack: (params: V) => Promise<T>, params: V, isCondition: (params: T) => boolean, countDown: number) => Promise<T>;
