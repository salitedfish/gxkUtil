/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 两个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryTwo<T extends [any?], K extends [any?], V = any>(func: (...args: [...T, ...K]) => V) {
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
export function useCurryThree<T extends [any?], K extends [any?], P extends [any?], V>(func: (...args: [...T, ...K, ...P]) => V) {
  function handler(...args: T): (..._args: K) => (...__args: P) => V;
  function handler(...args: [...T, ...K]): (...__args: P) => V;
  function handler(...args: [...T, ...K, ...P]): V;
  function handler(...args: T | [...T, ...K] | [...T, ...K, ...P]) {
    if ([0, 1].includes(args.length)) {
      return (..._args: K) => {
        return (...__args: P) => {
          return func(...(args as T), ..._args, ...__args);
        };
      };
    } else if (args.length === 2) {
      return (...__args: P) => {
        return func(...(args as [...T, ...K]), ...__args);
      };
    } else {
      return func(...(args as [...T, ...K, ...P]));
    }
  }
  return handler;
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 四个参数函数的柯里化(如果原始函数包含泛型，则不推荐使用，泛型会失效)
 * @_args func
 */
export function useCurryFour<T extends [any?], K extends [any?], P extends [any?], G extends [any?], V>(func: (...args: [...T, ...K, ...P, ...G]) => V) {
  function handler(...args: T): (..._args: K) => (...__args: P) => (...___args: G) => V;
  function handler(...args: [...T, ...K]): (...__args: P) => (...___args: G) => V;
  function handler(...args: [...T, ...K, ...P]): (...___args: G) => V;
  function handler(...args: [...T, ...K, ...P, ...G]): V;
  function handler(...args: T | [...T, ...K] | [...T, ...K, ...P] | [...T, ...K, ...P, ...G]) {
    if ([0, 1].includes(args.length)) {
      return (..._args: K) => {
        return (...__args: P) => {
          return (...___args: G) => {
            return func(...(args as T), ..._args, ...__args, ...___args);
          };
        };
      };
    } else if (args.length === 2) {
      return (...__args: P) => {
        return (...___args: G) => {
          return func(...(args as [...T, ...K]), ...__args, ...___args);
        };
      };
    } else if (args.length === 3) {
      return (...___args: G) => {
        return func(...(args as [...T, ...K, ...P]), ...___args);
      };
    } else {
      return func(...(args as [...T, ...K, ...P, ...G]));
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
