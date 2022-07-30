type Fn = (...args: any[]) => any;

type Func<Args extends unknown[], Ret> = (...args: Args) => Ret;

type RemoveLastArgs<Args extends unknown[]> = Args extends [] | [unknown?] ? Args : Args extends [...infer Rest, unknown?] ? Rest : never;

type NextArgs<Args extends unknown[], CurrentArgs extends unknown[]> = Args extends [...CurrentArgs, ...infer Rest] ? Rest : Args;

type Currying<Args extends unknown[], Ret, CurrentArgs extends unknown[] = Args, CurrentRet = Ret> = number extends CurrentArgs["length"]
  ? Func<CurrentArgs, CurrentRet>
  : CurrentArgs extends [] | [unknown?]
  ? Func<CurrentArgs, CurrentRet>
  : Currying<Args, Ret, RemoveLastArgs<CurrentArgs>, Currying<NextArgs<Args, RemoveLastArgs<CurrentArgs>>, Ret>> & Func<CurrentArgs, CurrentRet>;

type Curry<F extends Fn> = F extends (...args: infer Args) => infer Ret ? Currying<Args, Ret> : F;

export function useCurry<F extends Fn>(fn: F, invokeCount = 1): Curry<F> {
  const _args: unknown[] = [];

  let _invokeCount = 0;
  let _passedCount = 0;

  function _curry(...args: unknown[]) {
    if (args.length) {
      _args.push(...args);
    } else {
      _args.push(undefined);
    }

    if (invokeCount >= ++_invokeCount) {
      _passedCount = _args.length;
    }

    if (_args.length < fn.length) {
      return _curry;
    } else {
      const res = fn(..._args);
      _args.length = _passedCount;
      return res;
    }
  }

  return _curry as unknown as Curry<F>;
}
