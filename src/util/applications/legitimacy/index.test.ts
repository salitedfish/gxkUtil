import * as usePhoneLegal from ".";

/**test usePhoneLegal */
test("test usePhoneLegal", () => {
  expect(usePhoneLegal.usePhoneLegal(12345678912)).toBe(false);
  expect(usePhoneLegal.usePhoneLegal("13666870850")).toBe(true);
});

/**test useEmailLegal */
test("test useEmailLegal", () => {
  expect(usePhoneLegal.useEmailLegal("1525185228@qq.com")).toBe(true);
  expect(usePhoneLegal.useEmailLegal("1525185228@qq")).toBe(false);
});
