type Fn = (...args: any[]) => any;

type Func<Args extends unknown[], Ret> = (...args: Args) => Ret;

type RemoveLastArg<Args extends unknown[]> = Args extends [] | [unknown?] ? Args : Args extends [...infer Rest, unknown?] ? Rest : never;

type NextArgs<Args extends unknown[], CurrentArgs extends unknown[]> = Args extends [...CurrentArgs, ...infer Rest] ? Rest : Args;

type Currying<Args extends unknown[], Ret, CurrentArgs extends unknown[] = Args, CurrentRet = Ret> = number extends CurrentArgs["length"]
  ? Func<CurrentArgs, CurrentRet>
  : CurrentArgs extends [] | [unknown?]
  ? Func<CurrentArgs, CurrentRet>
  : Currying<Args, Ret, RemoveLastArg<CurrentArgs>, Currying<NextArgs<Args, RemoveLastArg<CurrentArgs>>, Ret>> & Func<CurrentArgs, CurrentRet>;

type Curry<F extends Fn> = F extends (...args: infer Args) => infer Ret ? Currying<Args, Ret> : F;

export function dynamicParamsCurry<F extends Fn>(fn: F): Curry<F> {
  function _curry(...args: unknown[]) {
    if (args.length === 0) {
      args.push(undefined);
    }

    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (..._args: unknown[]) => {
      if (_args.length === 0) {
        _args.push(undefined);
      }

      return _curry(...args, ..._args);
    };
  }

  return _curry as unknown as Curry<F>;
}
