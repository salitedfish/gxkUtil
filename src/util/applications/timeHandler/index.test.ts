import * as useTimeHandler from ".";

/**test useGenTimeStamp */
test("test useGenTimeStamp", () => {
  expect(useTimeHandler.useGenTimeStamp("2014年12月2日 15时2分1秒")).toBe(1417503721000);
  expect(useTimeHandler.useGenTimeStamp(1417503721000)).toBe(1417503721000);
  expect(useTimeHandler.useGenTimeStamp(1417503721)).toBe(1417503721000);
});

/**test useCountDownFormat */
test("test useCountDownFormat", () => {
  expect(useTimeHandler.useCountDownFormat(360000, "{dd}天{hh}时{mm}分{ss}秒")).toBe("00天00时06分00秒");
  expect(useTimeHandler.useCountDownFormat(7272000, "{h}时{m}分{s}秒")).toBe("2时1分12秒");
  expect(useTimeHandler.useCountDownFormat(7272000, "{h}h{m}m{s}s")).toBe("2h1m12s");
});

/**test useTimeFormat */
test("test useTimeFormat", () => {
  expect(useTimeHandler.useTimeFormat(1670818332000, "{YYYY}-{MM}-{dd} {hh}-{mm}-{ss}")).toBe("2022-12-12 12-12-12");
  expect(useTimeHandler.useTimeFormat(1670817732, "{hh}-{mm}-{ss}")).toBe("12-02-12");
  expect(useTimeHandler.useTimeFormat("2022-12-12 2:2:12", "{YY}-{MM}-{dd} {h}-{mm}-{ss}")).toBe("22-12-12 2-02-12");
  expect(useTimeHandler.useTimeFormat("2022-12-12 12:2:12", "{YY}年{MM}月{dd}日 {h}h{mm}m{ss}s")).toBe("22年12月12日 12h02m12s");
});

/**test useIsEarly */
test("test useIsEarly", () => {
  expect(useTimeHandler.useIsEarly("2022-1-12 12:12:12")).toBe(true);
  expect(useTimeHandler.useIsEarly("2022-2-12 12:12:12", "2022-1-12 12:12:12")).toBe(false);
  expect(useTimeHandler.useIsEarly("2021年2月12日 12:12:12", "2022-1-12 12:12:12")).toBe(true);
  expect(useTimeHandler.useIsEarly("2023年2/12日 12:12:12", 1234567000)).toBe(false);
  expect(useTimeHandler.useIsEarly("2022-2-12 12:12:12", 2343243456)).toBe(true);
  expect(useTimeHandler.useIsEarly(1234567898, 1234599999)).toBe(true);
});
