/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 两个参数函数的柯里化(测试,在ts中不太好用)
 * @param fun
 */
export function curryTwo<T, K, V>(fun: (paramOne?: T, paramTwo?: K) => V) {
  function curryTwoHandler(PA: T): (PC: K) => V;
  function curryTwoHandler(PA: T, PB: K): V;
  function curryTwoHandler(PA: T, PB?: K): V | ((PC: K) => V) {
    if (PB === undefined) {
      return (PC: K) => {
        return fun(PA, PC);
      };
    } else {
      return fun(PA, PB);
    }
  }

  return curryTwoHandler;
}
