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
