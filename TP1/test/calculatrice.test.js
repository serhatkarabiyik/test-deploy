const Calculatrice = require("../class/calculatrice");

describe("Calculatrice", () => {
  let calc;

  beforeEach(() => {
    calc = new Calculatrice();
  });

  test("Additionner", () => {
    expect(calc.add(5, 5)).toBe(10);
  });

  test("Soustraire", () => {
    expect(calc.sub(8, 4)).toBe(4);
  });

  test("Multiplier", () => {
    expect(calc.mul(5, 3)).toBe(15);
  });

  test("Diviser", () => {
    expect(calc.div(9, 3)).toBe(3);
  });
});
