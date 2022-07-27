/**
 * 对象类型
 */
export type ObjectType<T = any> = {
  [key: string]: T;
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
export type Function<P extends Params = any, R extends any = any> = (...args: P) => R;

/**
 * 函数返回值类型
 */
export type GetReturn<F extends Function> = F extends (...args: Params) => infer R ? R : never;

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
 * 参数数组拆分后类型
 */
export type SplitParams<P extends Params, PSplit extends Params[] = [], PRest extends Params = Tail<P>> = {
  recur: P extends [...infer A, ...PRest] ? SplitParams<Tail<P>, [...PSplit, A], Tail<PRest>> : never;
  result: PSplit;
  inner: [P[number]][];
}[number extends Length<P> ? "inner" : P extends [] ? "result" : "recur"];

// 把类型 [age: number, name: string, ...] 变成类型 [[age: number,], [name: string], ...]

/**
 * ts加法
 */
type GenerateArray<N extends number, Temp extends never[] = []> = Temp["length"] extends N ? Temp : GenerateArray<N, [never, ...Temp]>;
export type Add<A extends number, B extends number> = [...GenerateArray<A>, ...GenerateArray<B>]["length"];
