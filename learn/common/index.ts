/**
 * Promise.all的实现
 * @param promiseArray
 * @returns
 */
export const myPromiseAll = (promiseArray: Promise<unknown>[]): Promise<unknown[]> => {
  const resArray: unknown[] = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    /**判断函数 */
    const analy = (index: number, length: number) => {
      if (index == length) {
        resolve(resArray);
      } else {
        index++;
        next();
      }
    };
    /**递归函数 */
    const next = () => {
      /**如果是promise */
      if (promiseArray[index] instanceof Promise) {
        promiseArray[index]
          .then((res) => {
            resArray.push(res);
            analy(index, promiseArray.length - 1);
          })
          .catch((err) => {
            /**如果有错直接reject出去 */
            reject(err);
          });
        /**如果不是promise */
      } else {
        resArray.push(promiseArray[index]);
        analy(index, promiseArray.length - 1);
      }
    };
    next();
  });
};

Promise.all = myPromiseAll;




/**柯里化试验 */
type Param = [any?]

type Params = [paramType: Param, nextIndex: number][]

type CallbackParams<T extends Params> = {
  [P in keyof T]: T[P][0][0]
}

type ParamType<T extends Params, N extends number> = T[N][0]

type NextIndex<T extends Params, N extends number> = T[N][1]

export default function curry<T extends Params, R = any>(callback: (...args: CallbackParams<T>) => R, max: T["length"]) {
  const _args = [] as CallbackParams<T>

  function _curry<N extends number = 0>(...args: ParamType<T, N>): T[NextIndex<T, N>] extends undefined ? R : typeof _curry<NextIndex<T, N>> {
    args.length ? _args.push(args[0]) : _args.push(undefined)
    return _args.length < max ? _curry : callback.apply(null, _args) as any
  }

  return _curry
}


type Test = [
  [[id: number], 1],
  [[username: string], 2],
  [[nickname?: string], 3],
  [[enabled?: boolean], 4]
]

const callback = (
  id: number,
  username: string,
  nickname: string = username,
  enabled: boolean = true
) => `
  id：${id}\n
  用户名：${username}\n
  昵称：${nickname}\n
  状态：${enabled ? "启用" : "禁用"}\n
`

const foo = curry<Test, string>(callback, 4)

const bar = curry<Test, string>(callback, 4)

const fooRes = foo(123)("coder")("why")()

const barRes = bar(123)("coderwhy")()(false)

console.log("fooRes:\n", fooRes)
console.log("barRes:\n", barRes)



//普通文件上传
// async fileUpload(
//   file: File,
//   callBack?: (p: number) => void
// ): Promise<string> {
//   const fd = new FormData();
//   fd.append("file", file);
//   return await this.service.post(this.router.fileUpload.path, fd, {
//     headers: {
//       Authorization: this.getAuth(),
//       "Content-Type": this.router.fileUpload.dataType,
//     },
//     onUploadProgress: (p) => {
//       if (callBack) callBack(p);
//     },
//   });
// }

/**柯里化试验 */
type Cast<X, Y> = X extends Y ? X : Y;
type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>;
  1: T;
}[Length<I> extends N ? 1 : 0];
type Prepend<E, T extends any[]> = ((arg: E, ...args: T) => any) extends (...args: infer U) => any ? U : T;
type Length<T extends any[]> = T["length"];
type Tail<T extends any[]> = ((...args: T) => any) extends (arg1: any, ...tail: infer A) => any ? A : [];
type Curry<P extends any[], R> = <T extends any[]>(...args: Cast<T, Partial<P>>) => Drop<Length<T>, P> extends [any, ...any[]] ? Curry<Drop<Length<T>, P> extends infer DT ? Cast<DT, any[]> : never, R> : R;
declare function CurryV5<P extends any[], R>(f: (...args: P) => R): Curry<P, R>;
