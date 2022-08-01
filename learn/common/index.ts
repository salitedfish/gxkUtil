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

class A {
  private name: string;
  public age: number;
  static address: string;
  constructor() {
    this.name = "gxk";
    this.age = 100;
    A.address = "china";
  }

  say() {
    return this.name;
  }
}
const a = new A();
a.age;
A.address = "45";
