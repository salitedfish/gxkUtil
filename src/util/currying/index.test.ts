import * as useCurry from ".";

/**test useCurryTwo */
test("test useCurryTwo", () => {
  const sum = (a: number, b: number = 1) => {
    return a + b;
  };
  const sumCurry = useCurry.useCurryTwo(sum);
  expect(sumCurry(1)()).toBe(2);
  expect(sumCurry(1)(2)).toBe(3);
  expect(sumCurry(1, 2)).toBe(3);
});

/**test useCurryThree */
test("test useCurryThree", () => {
  const sum = (a: number, b: number, d: number = 1) => {
    return a + b + d;
  };
  const sumCurry = useCurry.useCurryThree(sum);
  const aumCurry = sumCurry(1);
  expect(aumCurry(1)(2)).toBe(4);
  expect(aumCurry(1)()).toBe(3);
  expect(sumCurry(1)(2)()).toBe(4);
  expect(sumCurry(1, 2, 1)).toBe(4);
  expect(sumCurry(1, 2)(1)).toBe(4);
});

/**test useCurryFour */
test("test useCurryFour", () => {
  const sum = (a: number, b: number, e: number, d: string) => {
    return a + b + e + d;
  };
  const sumCurry = useCurry.useCurryFour(sum);
  const aumCurry = sumCurry(1, 2);
  expect(aumCurry(3)("4")).toBe("64");
  expect(aumCurry(2)("2")).toBe("52");
  expect(sumCurry(1)(2)(3)("4")).toBe("64");
  expect(sumCurry(1, 2, 1)("2")).toBe("42");
  expect(sumCurry(1, 2)(1)("2")).toBe("42");
  expect(sumCurry(1, 2, 1, "2")).toBe("42");
});
