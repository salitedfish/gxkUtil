import type { Function, SplitParams } from "../../type";

/**
 * 三个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryThree<F extends Function>(func: F) {
  type P = SplitParams<Parameters<F>>;
  type V = ReturnType<F>;
  type T = P[0] extends [any?] ? P[0] : [];
  type K = P[1] extends [any?] ? P[1] : [];
  type L = P[2] extends [any?] ? P[2] : [];

  function handler(...args: T): (..._args: K) => (...__args: L) => V;
  function handler(...args: [...T, ...K]): (...__args: L) => V;
  // function handler(...args: [...T, ...K, ...L]): V; /**不明原因ts打包时,无法展开第三个参数会报错 */
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
