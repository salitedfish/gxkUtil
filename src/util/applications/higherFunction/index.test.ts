import * as useHigherFunc from ".";
import { useRunTimes } from "../../applications/common";
import { useDeepEqual } from "../../dataOperate";

/**测试异步请求用的，延时200ms，随机返回0 ~ 4的整数 */
const genAsync = (delay: number = 200) => {
  const res = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, delay);
  });
};

/**test usePromiseInsist */
test("test usePromiseInsist", async () => {
  try {
    const genTarget = await useHigherFunc.usePromiseInsist(genAsync)((res) => {
      return res === 3;
    })(100);
    expect(genTarget).toBe(3);
  } catch (err) {
    expect(err !== 3).toBe(false);
  }
});

/**test usePromiseQueue */
test("test usePromiseQueue", async () => {
  const promises: (() => Promise<number>)[] = [];
  for (let i = 0; i <= 5; i++) {
    promises.push(() => {
      return Promise.resolve(i);
    });
  }
  const res = await useHigherFunc.usePromiseQueue(
    promises,
    (res: number) => {
      return res < 6;
    },
    {
      insist: true,
    }
  );

  expect(useDeepEqual(res, [0, 1, 2, 3, 4, 5])()).toBe(true);
  try {
    await useHigherFunc.usePromiseQueue(promises, (res: number) => {
      return res < 2;
    });
  } catch (err) {
    expect(useDeepEqual(err, [0, 1])()).toBe(true);
  }

  try {
    await useHigherFunc.usePromiseQueue(
      promises,
      (res: number) => {
        return res < 3;
      },
      {
        insist: true,
      }
    );
  } catch (err) {
    expect(useDeepEqual(err, [0, 1, 2])()).toBe(true);
  }
});

/**test useDebounce */
test("test useDebounce", async () => {
  let time = 0;
  const setTime = () => {
    time++;
  };
  const debounceSetTime = useHigherFunc.useDebounce(setTime);
  useRunTimes(
    () => {
      debounceSetTime();
    },
    { times: 3 }
  );
  setTimeout(() => {
    debounceSetTime();
  }, 500);
  setTimeout(() => {
    expect(time).toBe(1);
  }, 1600);
});

/**test useThrottle */
test("test useThrottle", async () => {
  let time = 0;
  const setTime = () => {
    time++;
  };
  const throttleSetTime = useHigherFunc.useThrottle(setTime);
  useRunTimes(
    () => {
      throttleSetTime();
    },
    { times: 2 }
  );
  setTimeout(() => {
    throttleSetTime();
    expect(time).toBe(2);
  }, 1100);
});

/**test useTimesClick */
test("test useTimesClick", async () => {
  let time = 0;
  const setTime = () => {
    time++;
  };
  // 操作三次才执行callback
  const timesClick = useHigherFunc.useTimesClick(setTime, {
    times: 3,
  });
  // 操作六次，但是callback只会执行一次，因为执行完有个间歇周期300ms
  useRunTimes(
    () => {
      timesClick();
    },
    { times: 6 }
  );
  expect(time).toBe(1);
});
