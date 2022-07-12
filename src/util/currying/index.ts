/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 测试两个参数函数的柯里化(测试中，不太好用)
 * @_args fun
 */
export function useCurryTwo<T extends [any?], K extends [any?], V = void>(func: (...args: [...T, ...K]) => V) {
  function handler(...args: T): (..._args: K) => V;
  function handler(...args: [...T, ...K]): V;
  function handler(...args: T | [...T, ...K]) {
    if (args.length === 1) {
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
 * 测试三个参数函数的柯里化(测试中，不太好用)
 * @_args fun
 */
export function useCurryThree<T extends [any?], K extends [any?], P extends [any?], V>(func: (...args: [...T, ...K, ...P]) => V) {
  function handler(...args: T): (..._args: K) => (...__args: P) => V;
  function handler(...args: [...T, ...K]): (...__args: P) => V;
  function handler(...args: [...T, ...K, ...P]): V;
  function handler(...args: T | [...T, ...K] | [...T, ...K, ...P]) {
    if (args.length === 1) {
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

// const a = <T, B>(a: T, b?: B, c: number = 1): number => {
//   return Number(a) + Number(b) + Number(c);
// };

// const b = (<T, B>() => {
//   return useCurryThree<[a: T], [b?: B], [c?: number], number>(a);
// })();

// const test = b(1)("123");
// test(34);
