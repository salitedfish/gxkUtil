type CommonFu<Params extends any[] = any[], Result = void> = (...params: Params) => Result;

export type UseDebounce = <V extends any[]>(
  callBack: (...params: V) => unknown,
  countDown?: number
) => (...params: V) => void;

export type UseThrottling = <V extends any[]>(
  callBack: (...params: V) => unknown,
  countDown?: number
) => (...params: V) => void;

export type UsePromiseQueue<U = any> = <V extends { [key: string]: any }, T extends U>(
  asyncCallBack: (params: V) => Promise<T>,
  params: V,
  isCondition: (params: T) => boolean,
  countDown: number
) => Promise<T>;
