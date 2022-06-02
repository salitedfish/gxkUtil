import { UseDebounce, UseThrottling, UsePromiseQueue } from "../type";
/**防抖Hook */
export const useDebounce: UseDebounce = (callBack, countDown = 1000) => {
  let timer: number;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callBack(...params);
      clearTimeout(timer);
    }, countDown);
  };
};

/**usage */
// const handler = async (info: { page: number; pageSize: number }) => {
//   let list = Promise.resolve(info);
//   console.log(list);
//   return true;
// };
// const test = useDebounce(handler, 500);
// test({ page: 1, pageSize: 1 });

/**节流Hook */
export const useThrottling: UseThrottling = (callBack, countDown = 1000) => {
  let lock = false;
  return (...params) => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        callBack(...params);
        lock = false;
      }, countDown);
    }
  };
};

/**usage */
// const handler = async (info: { page: number; pageSize: number }) => {
//   let list = Promise.resolve(info);
//   console.log(list);
//   return true;
// };
// const test = useThrottling(handler, 500);
// test({ page: 1, pageSize: 1 });

/**异步队列Hook */
/**promise返回结果后，如果成功则返回，否则继续请求,直到最终满足条件 */
export const usePromiseQueue: UsePromiseQueue<{
  code: number;
  data: unknown;
  message: string;
}> = (asyncCallBack, params, isCondition, countDown) => {
  return new Promise((resolve) => {
    const handler = async () => {
      try {
        const result = await asyncCallBack(params);
        if (isCondition(result)) {
          resolve(result);
        } else {
          setTimeout(handler, countDown);
        }
      } catch (error) {
        throw Error(error as any);
      }
    };
    setTimeout(handler, countDown);
  });
};

/**usage */
// const request = (info: {
//   page: number;
//   pageSize: number;
// }): Promise<{ code: number; data: { list: string[] }; message: string }> => {
//   /**
//    * page
//    * pageSize
//    */
//   return Promise.resolve({
//     code: 200,
//     data: {
//       list: ["2", "2"]
//     },
//     message: "f"
//   });
// };

// const test = async () => {
//   const res = await usePromiseQueue(
//     request,
//     { page: 1, pageSize: 1 },
//     res => {
//       return res.code == 200;
//     },
//     1000
//   );
// };
// test();

/**localStorage */
export const useGetLStorage = (key: string, defaultValue: any = undefined) => {
  let value = localStorage.getItem(key);
  if (!value) {
    return defaultValue;
  }
  try {
    value = JSON.parse(value);
    return value;
  } catch (err) {
    return value;
  }
};

export const useSetLStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const useRmLStorage = (key: string) => {
  localStorage.removeItem(key);
};
