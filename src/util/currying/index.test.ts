import * as useCurry from ".";

/**test useCurryTwo */
test("test useGenParamsUrl", () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };
  expect(useCurry.useCurryTwo(sum)(1)(2)).toBe(3);
  expect(useCurry.useCurryTwo(sum)(1, 2)).toBe(3);
});

/**test useCurryThree */
test("test useGenParamsUrl", () => {
  const sum = (a: number, b: number, c: number) => {
    return a + b + c;
  };
  expect(useCurry.useCurryThree(sum)(1)(2)(3)).toBe(6);
  expect(useCurry.useCurryThree(sum)(1, 2, 1)).toBe(4);
});
