import { inToCm, getMonthIndex } from "./utils";

test("1 inch to be 2.54 cm", () => {
  expect(inToCm(1)).toBe(2.54);
});
