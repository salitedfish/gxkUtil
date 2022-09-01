import { Function, SplitParams } from "../../type";

/**
 * 两个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryTwo<F extends Function>(func: F) {
  type P = SplitParams<Parameters<F>>;
  type V = ReturnType<F>;
  type T = P[0] extends [any?] ? P[0] : [];
  type K = P[1] extends [any?] ? P[1] : [];

  function handler(...args: T): (..._args: K) => V;
  function handler(...args: [...T, ...K]): V;
  function handler(...args: T | [...T, ...K]) {
    if ([0, 1].includes(args.length)) {
      return (..._args: K) => {
        return func(...(args as T), ..._args);
      };
    } else {
      return func(...(args as [...T, ...K]));
    }
  }
  return handler;
}
