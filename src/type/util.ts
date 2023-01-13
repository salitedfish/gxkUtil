/**
 * 获取枚举值的联合类型
 */
type GetNumberEnumValue<E extends number> = `${E}` extends `${infer T extends number}` ? T : never;
type GetStringEnumValue<E extends string | number> = `${E}`;
export type GetEnumValue<E extends number | string> = E extends number ? GetNumberEnumValue<E> : GetStringEnumValue<E>;

/**
 * 对象类型
 */
export type ObjectType<T = any> = {
  [key: keyof any]: T;
};

/**
 * 对象只读类型
 */
export type ObjectReadonlyType<T = any> = {
  readonly [key: string]: T;
};

/**
 * 返回Promise加void
 */
export type PromiseWithVoid<T> = Promise<void | T>;

/**
 * 响应类型
 */
export type ResponseType<T = any> = {
  readonly code: number;
  readonly data: T;
  readonly status?: number;
  readonly message?: string;
  readonly success?: any;
  readonly error?: any;
};

/**
 * 请求类型
 */
export type Method = "GET" | "DELETE" | "POST" | "PUT";

/**
 * 通用函数类型
 */
export type ComFunction<P extends Params = any, R extends any = any> = (...args: P) => R;

/**
 * 只读参数类型
 */
export type Params<A = any> = ReadonlyArray<A>;

/**
 * 只读数组参数长度
 */
export type Length<L extends Params> = L["length"];

/**
 * 剩余参数类型
 */
export type Tail<L extends Params> = L extends readonly [] ? L : L extends readonly [any?, ...infer LTail] ? LTail : L;

/**
 * ts加法
 */
type GenerateArray<N extends number, Temp extends never[] = []> = Temp["length"] extends N ? Temp : GenerateArray<N, [never, ...Temp]>;
export type Add<A extends number, B extends number> = [...GenerateArray<A>, ...GenerateArray<B>]["length"];
