import * as useCommon from ".";

/**测试异步请求用的，延时200ms，随机返回0 ~ 4的整数 */
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
  expect(useCommon.useFileNameFromURL("efefer/test.jpg")).toBe("test");
  expect(useCommon.useFileNameFromURL("efefer/test.jpg", true)).toBe("test.jpg");
});

/**test useFileTypeFromURL */
test("test useFileTypeFromURL", () => {
  expect(useCommon.useFileTypeFromURL("efefer/test.jpg")).toBe("jpg");
  expect(useCommon.useFileTypeFromURL("efefer/test.jpg", true)).toBe("image");
});

/**test usePromiseInsist */
test("test usePromiseInsist", async () => {
  try {
    const genTarget = await useCommon.usePromiseInsist(genAsync)((res) => {
      return res === 3;
    })();
    expect(genTarget).toBe(3);
  } catch (err) {
    expect(err).toMatch("Exceeded times");
  }
});

/**test useGenParamsUrl */
test("test useGenParamsUrl", () => {
  expect(useCommon.useGenParamsUrl("http://test.com", { a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
  expect(useCommon.useGenParamsUrl("http://test.com?")({ a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
});

/**test useFileNameFromURL */
test("test useFileNameFromURL", () => {
  expect(useCommon.useFileNameFromURL("http://test.com/home/test.jpg")).toBe("test");
  expect(useCommon.useFileNameFromURL("http://test.com/home/test.jpg", true)).toBe("test.jpg");
});
