import _ from "underscore";

describe("About Applying What We Have Learnt", () => {
  let products;

  beforeEach(() => {
    products = [
      {
        name: "Sonoma",
        ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
        containsNuts: false,
      },
      {
        name: "Pizza Primavera",
        ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
        containsNuts: false,
      },
      {
        name: "South Of The Border",
        ingredients: ["black beans", "jalapenos", "mushrooms"],
        containsNuts: false,
      },
      {
        name: "Blue Moon",
        ingredients: ["blue cheese", "garlic", "walnuts"],
        containsNuts: true,
      },
      {
        name: "Taste Of Athens",
        ingredients: ["spinach", "kalamata olives", "sesame seeds"],
        containsNuts: true,
      },
    ];
  });

  /** ****************************************************************************** */

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", () => {
    let i;
    let j;
    let hasMushrooms;
    const productsICanEat = [];

    for (i = 0; i < products.length; i++) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j++)
          if (products[i].ingredients[j] === "mushrooms") hasMushrooms = true;

        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", () => {
    let productsICanEat = [];

    productsICanEat = _.filter(
      products,
      product =>
        _.all(product.ingredients, ingredient => ingredient !== "mushrooms") &&
        !product.containsNuts
    );

    expect(productsICanEat.length).toBe(1);
  });

  /** ****************************************************************************** */

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", () => {
    let sum = 0;

    for (let i = 1; i < 1000; i++) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", () => {
    const sum = _.chain(_.range(1, 1000))
      .reduce((sum, n) => {
        if (n % 3 === 0 || n % 5 === 0) {
          sum += n;
        }
        return sum;
      }, 0)
      .value();

    expect(233168).toBe(sum);
  });

  /** ****************************************************************************** */
  it("should count the ingredient occurrence (imperative)", () => {
    const ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i++) {
      for (j = 0; j < products[i].ingredients.length; j++) {
        ingredientCount[products[i].ingredients[j]] =
          (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount.mushrooms).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", () => {
    let ingredientCount = { "{ingredient name}": 0 };

    ingredientCount = _.chain(products)
      .map(product => product.ingredients)
      .flatten()
      .reduce((allIngredients, ingredient) => {
        if (ingredient in allIngredients) allIngredients[ingredient]++;
        else allIngredients[ingredient] = 1;

        return allIngredients;
      }, {})
      .value();

    expect(ingredientCount.mushrooms).toBe(2);
  });
});
