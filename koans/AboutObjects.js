describe("About Objects", () => {
  describe("Properties", () => {
    let meglomaniac;

    beforeEach(
      () => (meglomaniac = { mastermind: "Joker", henchwoman: "Harley" })
    );

    it("should confirm objects are collections of properties", () =>
      expect(meglomaniac.mastermind).toBe("Joker"));

    it("should confirm that properties are case sensitive", () => {
      expect(meglomaniac.henchwoman).toBe("Harley");
      expect(meglomaniac.henchWoman).toBe(undefined);
    });
  });

  it("should know properties that are functions act like methods", () => {
    const meglomaniac = {
      mastermind: "Brain",
      henchman: "Pinky",
      battleCry(noOfBrains) {
        return `They are ${this.henchman} and the${Array(noOfBrains + 1).join(
          ` ${this.mastermind}`
        )}`;
      },
    };

    const battleCry = meglomaniac.battleCry(4);
    expect("They are Pinky and the Brain Brain Brain Brain").toMatch(battleCry);
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const meglomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge() {
        return currentYear - this.birthYear;
      },
    };

    expect(currentYear).toBe(new Date().getFullYear());
    expect(meglomaniac.calculateAge()).toBe(
      currentYear - meglomaniac.birthYear
    );
  });

  describe("'in' keyword", () => {
    let meglomaniac;
    beforeEach(() => {
      meglomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true,
      };
    });

    it("should have the bomb", () => {
      const hasBomb = "theBomb" in meglomaniac;

      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", () => {
      const hasDetonator = "theDetonator" in meglomaniac;

      expect(hasDetonator).toBe(false);
    });
  });

  it("should know that properties can be added and deleted", () => {
    const meglomaniac = { mastermind: "Agent Smith", henchman: "Agent Smith" };

    expect("secretary" in meglomaniac).toBe(false);

    meglomaniac.secretary = "Agent Smith";
    expect("secretary" in meglomaniac).toBe(true);

    delete meglomaniac.henchman;
    expect("henchman" in meglomaniac).toBe(false);
  });

  it("should use prototype to add to all objects", () => {
    const Circle = function (radius) {
      this.radius = radius;
    };

    const simpleCircle = new Circle(10);
    const colouredCircle = new Circle(5);
    colouredCircle.colour = "red";

    expect(simpleCircle.colour).toBe(undefined);
    expect(colouredCircle.colour).toBe("red");

    Circle.prototype.describe = function () {
      return `This circle has a radius of: ${this.radius}`;
    };

    expect(simpleCircle.describe()).toBe("This circle has a radius of: 10");
    expect(colouredCircle.describe()).toBe("This circle has a radius of: 5");
  });
});
