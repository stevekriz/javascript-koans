/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
describe('About Functions', () => {
  it('should declare functions', () => {
    const add = function (a, b) {
      return a + b;
    };

    expect(add(1, 2)).toBe(3);
  });

  it('should know internal variables override outer variables', () => {
    const message = 'Outer';

    const getMessage = function () {
      return message;
    };

    const overrideMessage = function () {
      const message = 'Inner';

      return message;
    };

    expect(getMessage()).toBe('Outer');
    expect(overrideMessage()).toBe('Inner');
    expect(message).toBe('Outer');
  });

  it('should have lexical scoping', () => {
    const variable = 'top-level';

    const parentfunction = function () {
      const variable = 'local';

      const childfunction = function () {
        return variable;
      };
      return childfunction();
    };
    expect(parentfunction()).toBe('local');
  });

  it('should use lexical scoping to synthesise functions', () => {
    const makeIncreaseByFunction = function (increaseByAmount) {
      return function (numberToIncrease) {
        return numberToIncrease + increaseByAmount;
      };
    };

    const increaseBy3 = makeIncreaseByFunction(3);
    const increaseBy5 = makeIncreaseByFunction(5);

    expect(increaseBy3(10) + increaseBy5(10)).toBe(28);
  });

  it('should allow extra function arguments', () => {
    const returnFirstArg = function (firstArg) {
      return firstArg;
    };

    expect(returnFirstArg('first', 'second', 'third')).toBe('first');

    const returnSecondArg = function (firstArg, secondArg) {
      return secondArg;
    };

    expect(returnSecondArg('only give first arg')).toBe(undefined);

    const returnAllArgs = function () {
      const argsArray = [];

      for (let i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(',');
    };

    expect(returnAllArgs('first', 'second', 'third')).toBe('first,second,third');
  });

  it('should pass functions as values', () => {
    const appendRules = function (name) {
      return `${name} rules!`;
    };

    const appendDoubleRules = function (name) {
      return `${name} totally rules!`;
    };

    const praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise('John')).toBe('John rules!');

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise('Mary')).toBe('Mary totally rules!');
  });
});
