/**
 * 获取枚举值的联合类型
 * 如 {a;b;} 变为 0 | 1
 */
type NumberEnumValue<E extends number> = `${E}` extends `${infer T extends number}` ? T : never;
type StringEnumValue<E extends string | number> = `${E}`;
export type EnumValue<E extends number | string> = E extends number ? NumberEnumValue<E> : StringEnumValue<E>;

/**
 * 集合两个接口的类型
 * 如 {a: string} 和 {b: number} 变为 {a: string, b: number}
 */
export type MergeObject<T, G> = {
  [J in keyof T | keyof G]: J extends keyof T ? T[J] : J extends keyof G ? G[J] : never;
};

/**
 * ts加法
 */
type GenerateArray<N extends number, Temp extends never[] = []> = Temp["length"] extends N ? Temp : GenerateArray<N, [never, ...Temp]>;
export type Add<A extends number, B extends number> = [...GenerateArray<A>, ...GenerateArray<B>]["length"];

/**
 * 对象类型
 * 其实有内置工具类型Record
 */
export type ObjectType<T = any> = {
  [key: keyof any]: T;
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
