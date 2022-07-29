import { Function, SplitParams } from "../../type";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 四个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryFour<F extends Function>(func: F) {
  type P = SplitParams<Parameters<F>>;
  type V = ReturnType<F>;
  type T = P[0] extends [any?] ? P[0] : [];
  type K = P[1] extends [any?] ? P[1] : [];
  type L = P[2] extends [any?] ? P[2] : [];
  type G = P[3] extends [any?] ? P[3] : [];

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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// type Fn = (...args: any[]) => any;

// type Func<Args extends unknown[], Ret> = (...args: Args) => Ret;

// type RemoveLastArgs<Args extends unknown[]> = Args extends [] | [unknown?] ? Args : Args extends [...infer Rest, unknown?] ? Rest : never;

// type NextArgs<Args extends unknown[], CurrentArgs extends unknown[]> = Args extends [...CurrentArgs, ...infer Rest] ? Rest : Args;

// type Currying<Args extends unknown[], Ret, CurrentArgs extends unknown[] = Args, CurrentRet = Ret> = number extends CurrentArgs["length"]
//   ? Func<CurrentArgs, CurrentRet>
//   : CurrentArgs extends [] | [unknown?]
//   ? Func<CurrentArgs, CurrentRet>
//   : Currying<Args, Ret, RemoveLastArgs<CurrentArgs>, Currying<NextArgs<Args, RemoveLastArgs<CurrentArgs>>, Ret>> & Func<CurrentArgs, CurrentRet>;

// type Curry<F extends Fn> = F extends (...args: infer Args) => infer Ret ? Currying<Args, Ret> : F;

// export function useCurry<F extends Fn>(fn: F, invokeCount = 1): Curry<F> {
//   const _args: unknown[] = [];

//   let _invokeCount = 0;
//   let _passedCount = 0;

//   function _curry(...args: unknown[]) {
//     if (args.length) {
//       _args.push(...args);
//     } else {
//       _args.push(undefined);
//     }

//     if (invokeCount >= ++_invokeCount) {
//       _passedCount = _args.length;
//     }

//     if (_args.length < fn.length) {
//       return _curry;
//     } else {
//       const res = fn(..._args);
//       _args.length = _passedCount;
//       return res;
//     }
//   }

//   return _curry as unknown as Curry<F>;
// }
