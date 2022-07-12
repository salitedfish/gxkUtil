/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 测试两个参数函数的柯里化(测试中，不太好用)
 * @_args fun
 */
export function useCurryTwo<T extends [any], K extends [any], V>(func: (...args: [...T, ...K]) => V) {
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
export function useCurryThree<T extends [any], K extends [any], P extends [any], V>(func: (...args: [...T, ...K, ...P]) => V) {
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
