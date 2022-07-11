/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 测试两个参数函数的柯里化(在ts中会改变形参名，不太好用)
 * @param fun
 */
export function useCurryTwo<T, K, V>(fun: (paramOne: T, paramTwo: K) => V) {
  function handler(PA: T): (PB: K) => V;
  function handler(PA: T, PB: K): V;
  function handler(PA: T, PB?: K): V | ((PB: K) => V) {
    if (PB === undefined) {
      return (PB: K) => {
        return fun(PA, PB);
      };
    } else {
      return fun(PA, PB);
    }
  }

  return handler;
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 测试三个参数函数的柯里化(在ts中会改变形参名，不太好用)
 * @param fun
 */
export function useCurryThree<T, K, P, V>(fun: (paramOne: T, paramTwo: K, paramThree: P) => V) {
  function handler(PA: T): (PB: K) => (PC: P) => V;
  function handler(PA: T, PB: K): (PC: P) => V;
  function handler(PA: T, PB: K, PC: P): V;
  function handler(PA: T, PB?: K, PC?: P) {
    if (PB === undefined && PC === undefined) {
      return (PB: K) => {
        return (PC: P) => {
          return fun(PA, PB, PC);
        };
      };
    } else if (PC === undefined && PB !== undefined) {
      return (PC: P) => {
        return fun(PA, PB, PC);
      };
    } else if (PB !== undefined && PC !== undefined) {
      return fun(PA, PB, PC);
    }
  }

  return handler;
}
