/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
type MaybeUndefined<T> = T extends [any] ? T : [];
type WithUndefined<T> = T | undefined;
/**
 * 测试两个参数函数的柯里化(测试中，不太好用)
 * @_args fun
 */
export function useCurryTwo<T extends WithUndefined<[any]>, K extends WithUndefined<[any]>, V>(func: (...args: [...MaybeUndefined<T>, ...MaybeUndefined<K>]) => V) {
  function handler(...args: MaybeUndefined<T>): (..._args: MaybeUndefined<K>) => V;
  function handler(...args: [...MaybeUndefined<T>, ...MaybeUndefined<K>]): V;
  function handler(...args: MaybeUndefined<T> | [...MaybeUndefined<T>, ...MaybeUndefined<K>]) {
    if (args.length === 1) {
      return (..._args: MaybeUndefined<K>) => {
        return func(...(args as MaybeUndefined<T>), ..._args);
      };
    } else {
      return func(...(args as [...MaybeUndefined<T>, ...MaybeUndefined<K>]));
    }
  }
  return handler;
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 测试三个参数函数的柯里化(测试中，不太好用)
 * @_args fun
 */
export function useCurryThree<T extends WithUndefined<[any]>, K extends WithUndefined<[any]>, P extends WithUndefined<[any]>, V>(func: (...args: [...MaybeUndefined<T>, ...MaybeUndefined<K>, ...MaybeUndefined<P>]) => V) {
  function handler(...args: MaybeUndefined<T>): (..._args: MaybeUndefined<K>) => (...__args: MaybeUndefined<P>) => V;
  function handler(...args: [...MaybeUndefined<T>, ...MaybeUndefined<K>]): (...__args: MaybeUndefined<P>) => V;
  function handler(...args: [...MaybeUndefined<T>, ...MaybeUndefined<K>, ...MaybeUndefined<P>]): V;
  function handler(...args: MaybeUndefined<T> | [...MaybeUndefined<T>, ...MaybeUndefined<K>] | [...MaybeUndefined<T>, ...MaybeUndefined<K>, ...MaybeUndefined<P>]) {
    if (args.length === 1) {
      return (..._args: MaybeUndefined<K>) => {
        return (...__args: MaybeUndefined<P>) => {
          return func(...(args as MaybeUndefined<T>), ..._args, ...__args);
        };
      };
    } else if (args.length === 2) {
      return (...__args: MaybeUndefined<P>) => {
        return func(...(args as [...MaybeUndefined<T>, ...MaybeUndefined<K>]), ...__args);
      };
    } else {
      return func(...(args as [...MaybeUndefined<T>, ...MaybeUndefined<K>, ...MaybeUndefined<P>]));
    }
  }
  return handler;
}
