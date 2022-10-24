import * as useLegitimacy from ".";

/**test usePhoneLegal */
test("test useLegitimacy", () => {
  expect(useLegitimacy.usePhoneLegal(12345678912)()).toBe(false);
  expect(useLegitimacy.usePhoneLegal("13666870850")()).toBe(true);
});

/**test useIDCargLegal*/
test("test useIDCargLegal", () => {
  expect(useLegitimacy.useIDCargLegal("331023199702021811")()).toBe(true);
  expect(useLegitimacy.useIDCargLegal("123124353453452332")()).toBe(false);
  expect(useLegitimacy.useIDCargLegal("33102319970202181x")()).toBe(false);
});

/**test useEmailLegal */
test("test useEmailLegal", () => {
  expect(useLegitimacy.useEmailLegal("1525185228@qq.com")()).toBe(true);
  expect(useLegitimacy.useEmailLegal("1525185228@qq")()).toBe(false);
});

/**test useIPV4Legal*/
test("test useIPV4Legal", () => {
  expect(useLegitimacy.useIPV4Legal("1.1.1.1")).toBe(true);
  expect(useLegitimacy.useIPV4Legal("1.t.1.1")).toBe(false);
  expect(useLegitimacy.useIPV4Legal("1.256.1.1")).toBe(false);
});

/**test useIsPositiveInt */
test("test useIsPositiveInt", () => {
  expect(useLegitimacy.useIsPositiveInt(1)).toBe(true);
  expect(useLegitimacy.useIsPositiveInt(0)).toBe(false);
  expect(useLegitimacy.useIsPositiveInt(1.1)).toBe(false);
  expect(useLegitimacy.useIsPositiveInt(-1)).toBe(false);
  expect(useLegitimacy.useIsPositiveInt(-1.1)).toBe(false);
  expect(useLegitimacy.useIsPositiveInt(NaN)).toBe(false);
});

/**test useIsPrime */
test("test useIsPrime", () => {
  expect(useLegitimacy.useIsPrime(-1)).toBe(false);
  expect(useLegitimacy.useIsPrime(0)).toBe(false);
  expect(useLegitimacy.useIsPrime(1.1)).toBe(false);
  expect(useLegitimacy.useIsPrime(1)).toBe(false);
  expect(useLegitimacy.useIsPrime(2)).toBe(true);
  expect(useLegitimacy.useIsPrime(3)).toBe(true);
  expect(useLegitimacy.useIsPrime(4)).toBe(false);
  expect(useLegitimacy.useIsPrime(5)).toBe(true);
  expect(useLegitimacy.useIsPrime(6)).toBe(false);
  expect(useLegitimacy.useIsPrime(101)).toBe(true);
});
