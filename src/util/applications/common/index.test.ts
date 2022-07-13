import * as useCommon from ".";
// import { Blob } from "node:buffer";

/**test useFileNameFromURL */
test("test useFileNameFromURL", () => {
  expect(useCommon.useFileNameFromURL("efefer/test.jpg")()).toBe("test");
  expect(useCommon.useFileNameFromURL("efefer/test.jpg")(true)).toBe("test.jpg");
});

/**test useFileTypeFromURL */
test("test useFileTypeFromURL", () => {
  expect(useCommon.useFileTypeFromURL("efefer/test.jpg")()).toBe("jpg");
  expect(useCommon.useFileTypeFromURL("efefer/test.jpg")(true)).toBe("image");
});

/**test useGenParamsUrl */
test("test useGenParamsUrl", () => {
  expect(useCommon.useGenParamsUrl("http://test.com", { a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
  expect(useCommon.useGenParamsUrl("http://test.com?")({ a: 1, b: 2 })).toBe("http://test.com?a=1&b=2");
});

/**test useFileNameFromURL */
test("test useFileNameFromURL", () => {
  expect(useCommon.useFileNameFromURL("http://test.com/home/test.jpg")()).toBe("test");
  expect(useCommon.useFileNameFromURL("http://test.com/home/test.jpg", true)).toBe("test.jpg");
});

/**test useGenMD5Hash */
test("test useGenMD5Hash", async () => {
  try {
    const md5Hash = await useCommon.useGenMD5Hash("abcdefg");
    expect(md5Hash).toBe("7ac66c0f148de9519b8bd264312c4d64");
  } catch (err) {
    expect(err).toMatch("");
  }
});

/**test useStrSHA256Hash */
test("test useStrSHA256Hash", () => {
  expect(useCommon.useStrSHA256Hash("abcdefg")).toBe("7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527baf665d4da9a");
});
