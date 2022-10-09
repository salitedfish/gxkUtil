import * as useTimeHandler from ".";

/**test useGenTimeStamp */
test("test useGenTimeStamp", () => {
  expect(useTimeHandler.useGenTimeStamp("2014年12月2日 15:2分1秒")).toBe(1417503721000);
  expect(useTimeHandler.useGenTimeStamp(1417503721000)).toBe(1417503721000);
  expect(useTimeHandler.useGenTimeStamp("1417503721000")).toBe(1417503721000);
  expect(useTimeHandler.useGenTimeStamp(NaN)).toBe(NaN);
  expect(useTimeHandler.useGenTimeStamp("SDFSDFSDF")).toBe(NaN);
});

/**test useCountDownFormat */
test("test useCountDownFormat", () => {
  expect(useTimeHandler.useCountDownFormat("{dd}天{hh}时{mm}分{ss}秒", 360000).format).toBe("00天00时06分00秒");
  expect(useTimeHandler.useCountDownFormat("{h}时{m}分{s}秒")(7272000).format).toBe("2时1分12秒");
  expect(useTimeHandler.useCountDownFormat("{h}h{m}m{s}s", 7272000).format).toBe("2h1m12s");
  expect(useTimeHandler.useCountDownFormat("{h}h{m}m{s}s")(7272000).format).toBe("2h1m12s");
  expect(useTimeHandler.useCountDownFormat("{h}h{m}m{s}s")("SDFRSDFSDF").format).toBe("NaNhNaNmNaNs");
});

/**test useTimeFormat */
test("test useTimeFormat", () => {
  expect(useTimeHandler.useTimeFormat("{YYYY}-{MM}-{dd} {HH}-{mm}-{ss} 周{w} 第{q}季度")(1659096579000).format).toBe("2022-07-29 20-09-39 周五 第三季度");
  expect(useTimeHandler.useTimeFormat("{YYYY}-{MM}-{dd} {hh}:{mm}:{ss} 星期{w}", 1670818332000).format).toBe("2022-12-12 12:12:12 星期一");
  expect(useTimeHandler.useTimeFormat("{HH}-{mm}-{ss}")(1659096579000).format).toBe("20-09-39");
  expect(useTimeHandler.useTimeFormat("{YY}-{MM}-{dd} {h}-{mm}-{ss}")("2022-12-12 2:2:12").format).toBe("22-12-12 2-02-12");
  expect(useTimeHandler.useTimeFormat("{YY}年{MM}月{dd}日 {h}h{mm}m{ss}s", "2022-12-12 12:2:12").format).toBe("22年12月12日 12h02m12s");
});

/**test useIsEarly */
test("test useIsEarly", () => {
  expect(useTimeHandler.useIsEarly("2022-1-12 12:12:12")(Date.now())).toBe(true);
  expect(useTimeHandler.useIsEarly("2022-1-12 12:12:12")("2022-1-12 12:12:12")).toBe(false);
  expect(useTimeHandler.useIsEarly("2022-2-12 12:12:12", "2022-1-12 12:12:12")).toBe(false);
  expect(useTimeHandler.useIsEarly("2021年2月12日 12:12:12", "2022-1-12 12:12:12")).toBe(true);
  expect(useTimeHandler.useIsEarly("2023年2/12日 12:12:12", 1234567000000)).toBe(false);
  expect(useTimeHandler.useIsEarly("2022-2-12 12:12:12", 2343243456000)).toBe(true);
  expect(useTimeHandler.useIsEarly(1234567898000, "1234599999000")).toBe(true);
});
