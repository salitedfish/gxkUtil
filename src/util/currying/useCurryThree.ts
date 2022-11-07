import type { ComFunction, Params, Tail, Length } from "../../type";

/**
 * 三个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryThree<F extends ComFunction>(func: F) {
  type P = SplitParams<Parameters<F>>;
  type V = ReturnType<F>;
  type T = P[0] extends [any?] ? P[0] : [];
  type K = P[1] extends [any?] ? P[1] : [];
  type L = P[2] extends [any?] ? P[2] : [];

  function handler(...args: T): (..._args: K) => (...__args: L) => V;
  function handler(...args: [...T, ...K]): (...__args: L) => V;
  function handler(...args: [...T, ...K, ...L]): V;
  function handler(...args: T | [...T, ...K] | [...T, ...K, ...L]) {
    if ([0, 1].includes(args.length)) {
      return (..._args: K) => {
        return (...__args: L) => {
          return func(...(args as T), ..._args, ...__args);
        };
      };
    } else if (args.length === 2) {
      return (...__args: L) => {
        return func(...(args as [...T, ...K]), ...__args);
      };
    } else {
      return func(...(args as [...T, ...K, ...L]));
    }
  }
  return handler;
}

// 不明原因如果SplitParams定义在使用的函数前面就无法解析第三个参数

/**
 * 参数数组拆分后类型
 */
type SplitParams<P extends Params, PSplit extends Params[] = [], PRest extends Params = Tail<P>> = {
  recur: P extends [...infer A, ...PRest] ? SplitParams<Tail<P>, [...PSplit, A], Tail<PRest>> : never;
  result: PSplit;
  inner: P[number][][];
}[number extends Length<P> ? "inner" : P extends [] ? "result" : "recur"];
