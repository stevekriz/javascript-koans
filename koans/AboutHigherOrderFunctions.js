import _ from "underscore";

describe("About Higher Order Functions", () => {
  it("should use filter to return array items that meet a criteria", () => {
    const numbers = [1, 2, 3];
    const odd = _(numbers).filter(x => x % 2 !== 0);

    expect(odd).toEqual([1, 3]);
    expect(odd.length).toBe(2);
    expect(numbers.length).toBe(3);
  });

  it('should use "map" to transform each element', () => {
    const numbers = [1, 2, 3];
    const numbersPlus1 = _(numbers).map(x => x + 1);

    expect(numbersPlus1).toEqual([2, 3, 4]);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('should use "reduce" to update the same result on each iteration', () => {
    const numbers = [1, 2, 3];
    const reduction = _(numbers).reduce((memo, x) => memo + x, 0);

    expect(reduction).toBe(6);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('should use "forEach" for simple iteration', () => {
    const numbers = [1, 2, 3];
    let msg = "";
    const isEven = function (item) {
      msg += item % 2 === 0;
    };

    _(numbers).forEach(isEven);

    expect(msg).toEqual("falsetruefalse");
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('should use "all" to test whether all items pass condition', () => {
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    const isEven = function (x) {
      return x % 2 === 0;
    };

    expect(_(onlyEven).all(isEven)).toBe(true);
    expect(_(mixedBag).all(isEven)).toBe(false);
  });

  it('should use "any" to test if any items passes condition', () => {
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    const isEven = function (x) {
      return x % 2 === 0;
    };

    expect(_(onlyEven).any(isEven)).toBe(true);
    expect(_(mixedBag).any(isEven)).toBe(true);
  });

  it("should use range to generate an array", () => {
    expect(_.range(3)).toEqual([0, 1, 2]);
    expect(_.range(1, 4)).toEqual([1, 2, 3]);
    expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it("should use flatten to make nested arrays easy to work with", () => {
    expect(
      _([
        [1, 2],
        [3, 4],
      ]).flatten()
    ).toEqual([1, 2, 3, 4]);
  });

  it("should use chain() ... .value() to use multiple higher order functions", () => {
    const result = _([[0, 1], 2])
      .chain()
      .flatten()
      .map(x => x + 1)
      .reduce((sum, x) => sum + x)
      .value();

    expect(result).toEqual(6);
  });
});
