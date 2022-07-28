import { Params } from "./index";
/**
 * ts内置工具类型
 */
/**Parameters高级类型 */
export type _Parameters<F extends Function> = F extends (...args: infer P) => any ? P : never;

/**ReturnType高级类型 */
export type _ReturnType<F extends Function> = F extends (...args: Params) => infer R ? R : never;

/**Omit高级类型 */
export type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**Pick高级类型 */
export type _Pick<T, P extends keyof T> = {
  [K in P]: T[P];
};

/**Record高级类型 */
export type _Record<P extends keyof any, T> = {
  [K in P]: T;
};

/**Exclude高级类型 */
export type _Exclude<T, U> = T extends U ? never : T;

/**Extract高级类型 */
export type _Extract<T, U> = T extends U ? T : never;

/**Partial高级类型 */
export type _Partial<T> = {
  [K in keyof T]?: T[K];
};

/**Required高级类型 */
export type _Required<T> = {
  [K in keyof T]-?: T[K];
};

/**Readonly高级类型 */
export type _Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

/**NonNullable高级类型 */
export type _NonNullable<T> = T extends null | undefined ? never : T;

/**ConstructorParameters */
export type _ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

/**InstanceType */
export type _InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

/**ThisParameterType */
export type _ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;

/**OmitThisParameter */
export type _OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
