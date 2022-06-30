import * as useApplication from "../..";

/**测试异步请求用的，随机返回0 ~ 4的整数 */
const genAsync = () => {
  const res = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 200);
  });
};

/**test useFileNameFromURL */
test("test useFileNameFromURL", () => {
  expect(useApplication.useFileNameFromURL("efefer/test.jpg")).toBe("test");
  expect(useApplication.useFileNameFromURL("efefer/test.jpg", true)).toBe("test.jpg");
});

/**test useFileTypeFromURL */
test("test useFileTypeFromURL", () => {
  expect(useApplication.useFileTypeFromURL("efefer/test.jpg")).toBe("jpg");
  expect(useApplication.useFileTypeFromURL("efefer/test.jpg", true)).toBe("img");
});

/**test usePromiseInsist */
test("test usePromiseInsist", async () => {
  try {
    const genTarget = await useApplication.usePromiseInsist(genAsync, (res) => {
      return res === 3;
    })();
    expect(genTarget).toBe(3);
  } catch (err) {
    expect(err).toMatch("Exceeded times");
  }
});

/**test useCountDownFormat */
test("test useCountDownFormat", () => {
  expect(useApplication.useCountDownFormat(360000, "{dd}天{hh}时{mm}分{ss}秒")).toBe("00天00时06分00秒");
  expect(useApplication.useCountDownFormat(7272000, "{h}时{m}分{s}秒")).toBe("2时1分12秒");
  expect(useApplication.useCountDownFormat(7272000, "{h}h{m}m{s}s")).toBe("2h1m12s");
});

/**test useTimeFormat */
test("test useTimeFormat", () => {
  expect(useApplication.useTimeFormat(Number(new Date("2022-12-12 12:12:12")), "{YYYY}-{MM}-{dd} {hh}-{mm}-{ss}")).toBe("2022-12-12 12-12-12");
  expect(useApplication.useTimeFormat(Number(new Date("2022-12-12 12:2:12")), "{hh}-{mm}-{ss}")).toBe("12-02-12");
  expect(useApplication.useTimeFormat(Number(new Date("2022-12-12 2:2:12")), "{YY}-{MM}-{dd} {h}-{mm}-{ss}")).toBe("22-12-12 2-02-12");
  expect(useApplication.useTimeFormat(Number(new Date("2022-12-12 12:2:12")), "{YY}年{MM}月{dd}日 {h}h{mm}m{ss}s")).toBe("22年12月12日 12h02m12s");
});

/**test useGenParamsUrl */
test("test useGenParamsUrl", () => {
  expect(useApplication.useGenParamsUrl("http://test.com", { a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
  expect(useApplication.useGenParamsUrl("http://test.com?", { a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
});

/**test useFileNameFromURL */
test("test useFileNameFromURL", () => {
  expect(useApplication.useFileNameFromURL("http://test.com/home/test.jpg")).toBe("test");
  expect(useApplication.useFileNameFromURL("http://test.com/home/test.jpg", true)).toBe("test.jpg");
});

/**test useIsEarly */
test("test useIsEarly", () => {
  expect(useApplication.useIsEarly("2022-1-12 12:12:12")).toBe(true);
  expect(useApplication.useIsEarly("2022-2-12 12:12:12", "2022-1-12 12:12:12")).toBe(false);
  expect(useApplication.useIsEarly("2021年2月12日 12:12:12", "2022-1-12 12:12:12")).toBe(true);
  expect(useApplication.useIsEarly("2023年2/12日 12:12:12", 1234567)).toBe(false);
  expect(useApplication.useIsEarly("2022-2-12 12:12:12", 234324)).toBe(false);
  expect(useApplication.useIsEarly(234234, 234324234)).toBe(true);
});
