import { GetParams, GetReturn, Function, SplitParams } from "../../type";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 两个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryTwo<F extends Function>(func: F) {
  type T = SplitParams<GetParams<F>>[0] extends [any?] ? SplitParams<GetParams<F>>[0] : [];
  type K = SplitParams<GetParams<F>>[1] extends [any?] ? SplitParams<GetParams<F>>[1] : [];
  function handler(...args: T): (..._args: K) => GetReturn<F>;
  function handler(...args: [...T, ...K]): GetReturn<F>;
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
// const a = <T extends any[], V>(a: (...params: T) => V, count: number) => {
//   return (...params: T) => {
//     console.log(count);
//     return a(...params);
//   };
// };
// const b = useCurryTwo(a);
// const c = b((name: string, age: number) => {
//   return name + age;
// })(123);
// c
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 三个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryThree<F extends Function>(func: F) {
  type T = SplitParams<GetParams<F>>[0] extends [any?] ? SplitParams<GetParams<F>>[0] : [];
  type K = SplitParams<GetParams<F>>[1] extends [any?] ? SplitParams<GetParams<F>>[1] : [];
  type L = SplitParams<GetParams<F>>[2] extends [any?] ? SplitParams<GetParams<F>>[2] : [];
  function handler(...args: T): (..._args: K) => (...__args: L) => GetReturn<F>;
  function handler(...args: [...T, ...K]): (...__args: L) => GetReturn<F>;
  function handler(...args: [...T, ...K, ...L]): GetReturn<F>;
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 四个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryFour<F extends Function>(func: F) {
  type T = SplitParams<GetParams<F>>[0] extends [any?] ? SplitParams<GetParams<F>>[0] : [];
  type K = SplitParams<GetParams<F>>[1] extends [any?] ? SplitParams<GetParams<F>>[1] : [];
  type L = SplitParams<GetParams<F>>[2] extends [any?] ? SplitParams<GetParams<F>>[2] : [];
  type G = SplitParams<GetParams<F>>[3] extends [any?] ? SplitParams<GetParams<F>>[3] : [];
  type V = GetReturn<F>;
  function handler(...args: T): (..._args: K) => (...__args: L) => (...___args: G) => V;
  function handler(...args: [...T, ...K]): (...__args: L) => (...___args: G) => V;
  function handler(...args: [...T, ...K, ...L]): (...___args: G) => V;
  function handler(...args: [...T, ...K, ...L, ...G]): V;
  function handler(...args: T | [...T, ...K] | [...T, ...K, ...L] | [...T, ...K, ...L, ...G]) {
    if ([0, 1].includes(args.length)) {
      return (..._args: K) => {
        return (...__args: L) => {
          return (...___args: G) => {
            return func(...(args as T), ..._args, ...__args, ...___args);
          };
        };
      };
    } else if (args.length === 2) {
      return (...__args: L) => {
        return (...___args: G) => {
          return func(...(args as [...T, ...K]), ...__args, ...___args);
        };
      };
    } else if (args.length === 3) {
      return (...___args: G) => {
        return func(...(args as [...T, ...K, ...L]), ...___args);
      };
    } else {
      return func(...(args as [...T, ...K, ...L, ...G]));
    }
  }
  return handler;
}

// const fangdou = <T>(shallow: T, c: number): T => {
//   c;
//   return shallow;
// };
// const fangdouCurry = (<T>() => {
//   return useCurryTwo<[shallow: T], [c: number], T>(fangdou);
// })();

// const g = fangdouCurry(2)(1);
// g;

// const a = <T, B>(a: T, b: B, c: number = 1): B => {
//   a;
//   c;
//   return b;
// };

// const b = (<T, B>() => {
//   return useCurryThree<[a: T], [b: B], [c?: number], B>(a);
// })();

// const test = b(1)(2)();
