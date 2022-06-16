import * as useApplication from "../util/application";

test("test useCountDownFormat", () => {
  expect(useApplication.useCountDownFormat(360000, "dd天hh时mm分ss秒")).toBe("00天00时06分00秒");
  expect(useApplication.useCountDownFormat(7272000, "h时m分s秒")).toBe("2时1分12秒");
});

test("test useTimeFormat", () => {
  expect(
    useApplication.useTimeFormat(Number(new Date("2022-12-12 12:12:12")), "YYYY-MM-dd hh-mm-ss")
  ).toBe("2022-12-12 12-12-12");
  expect(useApplication.useTimeFormat(Number(new Date("2022-12-12 12:2:12")), "hh-mm-ss")).toBe(
    "12-02-12"
  );
  expect(
    useApplication.useTimeFormat(Number(new Date("2022-12-12 2:2:12")), "YY-MM-dd h-mm-ss")
  ).toBe("22-12-12 2-02-12");
});

test("test useGenParamsUrl", () => {
  expect(useApplication.useGenParamsUrl("http://test.com", { a: 1, b: 2 })).toBe(
    "http://test.com?a=1&b=2"
  );
  expect(useApplication.useGenParamsUrl("http://test.com?", { a: 1, b: 2 })).toBe(
    "http://test.com?a=1&b=2"
  );
});

test("test useFileNameFromURL", () => {
  expect(useApplication.useFileNameFromURL("http://test.com/home/test.jpg")).toBe("test");
  expect(useApplication.useFileNameFromURL("http://test.com/home/test.jpg", true)).toBe("test.jpg");
});

test("test useIsEarly", () => {
  expect(useApplication.useIsEarly(Number(new Date("2022-12-12 12:12:12")))).toBe(false);
});
